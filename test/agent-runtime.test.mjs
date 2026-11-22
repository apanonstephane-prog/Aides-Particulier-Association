import test from 'node:test'
import assert from 'node:assert/strict'
import { streamAgent } from '../lib/agent/runtime.ts'

const history = [{ role: 'user', content: 'Météo Toulouse' }]
const config = { system: 'Utiliser les outils.', tools: [{ definition: { name: 'meteo', input_schema: { type: 'object', required: ['lieu'], properties: { lieu: { type: 'string' } } } }, label: () => 'Météo', run: async (input, { emit }) => { emit({ type: 'card', kind: 'weather', data: input }); return { temp: 12 } } }], fallback: 'Mode gratuit sans IA' }
const previousFetch = globalThis.fetch
const previousKey = process.env.GROQ_API_KEY
async function events() {
  const str = await streamAgent(config, history).text()
  return str.split('\n').filter(l => l.startsWith('data: ')).map(l => JSON.parse(l.slice(6)))
}
test('outils locaux, résultat de Groq et événements SSE', async () => {
  process.env.GROQ_API_KEY = 'test-placeholder'
  let calls = 0
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions')
    const body = JSON.parse(init.body)
    assert.equal(body.model, 'openai/gpt-oss-120b')
    assert.equal(body.max_completion_tokens, 1100)
    calls++
    if (calls === 1) return Response.json({ choices: [{ message: { role: 'assistant', content: null, tool_calls: [{ id: '1', type: 'function', function: { name: 'meteo', arguments: '{"lieu":"Toulouse"}' } }] } }] })
    assert.equal(body.messages.at(-1).role, 'tool')
    assert.equal(body.messages.at(-1).tool_call_id, '1')
    return Response.json({ choices: [{ message: { role: 'assistant', content: 'Il fait 12 °C.' } }] })
  }
  const out = await events()
  assert.deepEqual(out.map(e => e.type), ['tool_start', 'card', 'tool_end', 'text', 'done'])
  assert.equal(calls, 2)
})
test('429 : arrêt sans autre fournisseur ni relance', async () => {
  let calls = 0
  globalThis.fetch = async () => { calls++; return new Response('', { status: 429 }) }
  assert.deepEqual((await events()).map(e => e.type), ['text','done'])
  assert.equal(calls, 1)
})
test('absence de clé : aucun appel réseau', async () => {
  delete process.env.GROQ_API_KEY
  globalThis.fetch = async () => assert.fail('appel réseau interdit')
  assert.match((await events())[0].text, /Mode gratuit/)
})
test('arguments inconnus : outil non exécuté', async () => {
  process.env.GROQ_API_KEY = 'test-placeholder'
  let calls = 0
  globalThis.fetch = async (url, init) => {
    calls++
    if (calls === 1) return Response.json({ choices: [{ message: { role: 'assistant', tool_calls: [{ id: 'x', type: 'function', function: { name: 'meteo', arguments: '{"lieu":"Toulouse","extra":true}' } }] } }] })
    assert.match(JSON.parse(init.body).messages.at(-1).content, /invalides/)
    return Response.json({ choices: [{ message: { role: 'assistant', content: 'Reformulez.' } }] })
  }
  assert.deepEqual((await events()).map(e => e.type), ['text','done'])
  globalThis.fetch = previousFetch
  if (previousKey === undefined) delete process.env.GROQ_API_KEY; else process.env.GROQ_API_KEY = previousKey
})
test('un itinéraire inventé ne produit aucune carte', async () => {
  process.env.GROQ_API_KEY = 'test-placeholder'
  const cfg = { ...config, tools: [{ definition: { name: 'composer_itineraire', input_schema: { type: 'object', properties: { lat: { type: 'number' }, lng: { type: 'number' } } } }, label: () => 'Itinéraire', run: async () => assert.fail('coordonnées non vérifiées') }] }
  let calls = 0
  globalThis.fetch = async (_url, init) => {
    if (++calls === 1) return Response.json({ choices: [{ message: { role: 'assistant', tool_calls: [{ id: 'y', type: 'function', function: { name: 'composer_itineraire', arguments: '{"lat":43,"lng":1}' } }] } }] })
    assert.match(JSON.parse(init.body).messages.at(-1).content, /Coordonnées non vérifiées/)
    return Response.json({ choices: [{ message: { role: 'assistant', content: 'Je dois vérifier les lieux.' } }] })
  }
  assert.match(await streamAgent(cfg, history).text(), /dois vérifier/)
  globalThis.fetch = previousFetch
  if (previousKey === undefined) delete process.env.GROQ_API_KEY; else process.env.GROQ_API_KEY = previousKey
})

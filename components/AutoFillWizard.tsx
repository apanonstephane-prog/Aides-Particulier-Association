"use client";
import { useState } from "react";

type FormData = {
  // Identité
  civilite: string;
  nom: string;
  prenom: string;
  nomNaissance: string;
  dateNaissance: string;
  lieuNaissance: string;
  departementNaissance: string;
  nationalite: string;
  // Coordonnées
  adresse: string;
  complementAdresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
  // Situation
  situationFamiliale: string;
  nombreEnfants: string;
  // Revenus
  situationPro: string;
  revenuMensuel: string;
  // Numéros importants
  numeroSS: string;
  numeroCaf: string;
  iban: string;
};

const emptyForm: FormData = {
  civilite: "", nom: "", prenom: "", nomNaissance: "", dateNaissance: "",
  lieuNaissance: "", departementNaissance: "", nationalite: "Française",
  adresse: "", complementAdresse: "", codePostal: "", ville: "",
  telephone: "", email: "",
  situationFamiliale: "", nombreEnfants: "0",
  situationPro: "", revenuMensuel: "",
  numeroSS: "", numeroCaf: "", iban: "",
};

const steps = [
  { id: 1, label: "Identité", icon: "👤", desc: "Vos informations personnelles" },
  { id: 2, label: "Coordonnées", icon: "📍", desc: "Votre adresse et contacts" },
  { id: 3, label: "Situation", icon: "👨‍👩‍👧", desc: "Situation familiale et professionnelle" },
  { id: 4, label: "Numéros", icon: "🔢", desc: "Numéros administratifs importants" },
  { id: 5, label: "Récapitulatif", icon: "✅", desc: "Votre profil complet" },
];

const situationFamilialeOptions = [
  "Célibataire", "Marié(e)", "Pacsé(e)", "En concubinage",
  "Divorcé(e)", "Séparé(e)", "Veuf/Veuve", "Parent isolé",
];

const situationProOptions = [
  "Salarié(e) CDI", "Salarié(e) CDD", "Fonctionnaire", "Travailleur indépendant",
  "Demandeur d'emploi", "Étudiant(e)", "Retraité(e)", "Sans activité",
  "En formation", "Intérimaire",
];

export default function AutoFillWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [copied, setCopied] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState<{ label: string; data: FormData }[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveLabel, setSaveLabel] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const inputClass = "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-white placeholder-slate-400";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1.5";

  /* --- Génération du profil texte à copier --- */
  const generateProfile = () => {
    const lines: string[] = [
      "═══════════════════════════════════════",
      "       MON PROFIL ADMINISTRATIF",
      "═══════════════════════════════════════",
      "",
      "── IDENTITÉ ──────────────────────────",
      `${form.civilite} ${form.prenom} ${form.nom}`,
    ];
    if (form.nomNaissance && form.nomNaissance !== form.nom)
      lines.push(`Nom de naissance : ${form.nomNaissance}`);
    if (form.dateNaissance) lines.push(`Date de naissance : ${form.dateNaissance}`);
    if (form.lieuNaissance) lines.push(`Lieu de naissance : ${form.lieuNaissance}${form.departementNaissance ? ` (${form.departementNaissance})` : ""}`);
    if (form.nationalite) lines.push(`Nationalité : ${form.nationalite}`);
    lines.push("");
    lines.push("── ADRESSE ───────────────────────────");
    lines.push(form.adresse);
    if (form.complementAdresse) lines.push(form.complementAdresse);
    if (form.codePostal || form.ville) lines.push(`${form.codePostal} ${form.ville}`);
    lines.push("");
    lines.push("── CONTACTS ──────────────────────────");
    if (form.telephone) lines.push(`Téléphone : ${form.telephone}`);
    if (form.email) lines.push(`Email : ${form.email}`);
    lines.push("");
    lines.push("── SITUATION ─────────────────────────");
    if (form.situationFamiliale) lines.push(`Situation familiale : ${form.situationFamiliale}`);
    if (form.nombreEnfants) lines.push(`Nombre d'enfants à charge : ${form.nombreEnfants}`);
    if (form.situationPro) lines.push(`Situation professionnelle : ${form.situationPro}`);
    if (form.revenuMensuel) lines.push(`Revenu mensuel net : ${form.revenuMensuel} €`);
    lines.push("");
    lines.push("── NUMÉROS ADMINISTRATIFS ────────────");
    if (form.numeroSS) lines.push(`N° Sécurité Sociale : ${form.numeroSS}`);
    if (form.numeroCaf) lines.push(`N° Allocataire CAF : ${form.numeroCaf}`);
    if (form.iban) lines.push(`IBAN : ${form.iban}`);
    lines.push("");
    lines.push("═══════════════════════════════════════");
    lines.push(`Généré le ${new Date().toLocaleDateString("fr-FR")} via AidesConnect`);
    return lines.join("\n");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateProfile());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = generateProfile();
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const saveProfile = () => {
    if (!saveLabel.trim()) return;
    setSavedProfiles(prev => [...prev, { label: saveLabel, data: { ...form } }]);
    setShowSaveModal(false);
    setSaveLabel("");
  };

  const loadProfile = (p: { label: string; data: FormData }) => {
    setForm(p.data);
    setStep(5);
  };

  const reset = () => {
    setForm(emptyForm);
    setStep(1);
  };

  /* ─────────────── RENDU ─────────────── */
  return (
    <div className="space-y-6">
      {/* Profils sauvegardés */}
      {savedProfiles.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-xs font-semibold text-green-700 mb-2">📁 Profils sauvegardés</p>
          <div className="flex flex-wrap gap-2">
            {savedProfiles.map((p, i) => (
              <button key={i} onClick={() => loadProfile(p)}
                className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors">
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Barre de progression */}
      <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto pb-1">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            <button
              onClick={() => step > s.id || step === s.id ? setStep(s.id) : null}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-xl text-xs font-medium transition-all
                ${step === s.id
                  ? "bg-blue-600 text-white shadow-md"
                  : step > s.id
                    ? "bg-green-100 text-green-700 cursor-pointer hover:bg-green-200"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
            >
              <span>{step > s.id ? "✓" : s.icon}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`w-4 sm:w-6 h-0.5 flex-shrink-0 ${step > s.id ? "bg-green-400" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Titre de l'étape */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <span className="text-2xl">{steps[step - 1].icon}</span>
        <div>
          <p className="font-semibold text-slate-800">{steps[step - 1].label}</p>
          <p className="text-xs text-slate-500">{steps[step - 1].desc}</p>
        </div>
      </div>

      {/* ── Étape 1 : Identité ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Civilité *</label>
            <div className="flex gap-2">
              {["M.", "Mme"].map(c => (
                <button key={c} onClick={() => set("civilite", c)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all
                    ${form.civilite === c ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nom de famille *</label>
              <input className={inputClass} placeholder="DUPONT" value={form.nom}
                onChange={e => set("nom", e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className={labelClass}>Prénom(s) *</label>
              <input className={inputClass} placeholder="Marie" value={form.prenom}
                onChange={e => set("prenom", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Nom de naissance (si différent)</label>
            <input className={inputClass} placeholder="MARTIN" value={form.nomNaissance}
              onChange={e => set("nomNaissance", e.target.value.toUpperCase())} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date de naissance *</label>
              <input className={inputClass} type="date" value={form.dateNaissance}
                onChange={e => set("dateNaissance", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Lieu de naissance *</label>
              <input className={inputClass} placeholder="Paris" value={form.lieuNaissance}
                onChange={e => set("lieuNaissance", e.target.value)} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Département de naissance</label>
              <input className={inputClass} placeholder="75 — Paris" value={form.departementNaissance}
                onChange={e => set("departementNaissance", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Nationalité</label>
              <input className={inputClass} placeholder="Française" value={form.nationalite}
                onChange={e => set("nationalite", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Étape 2 : Coordonnées ── */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Adresse *</label>
            <input className={inputClass} placeholder="12 rue de la Paix" value={form.adresse}
              onChange={e => set("adresse", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Complément d&apos;adresse</label>
            <input className={inputClass} placeholder="Bâtiment A, Appartement 3" value={form.complementAdresse}
              onChange={e => set("complementAdresse", e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Code postal *</label>
              <input className={inputClass} placeholder="75001" maxLength={5} value={form.codePostal}
                onChange={e => set("codePostal", e.target.value.replace(/\D/g, ""))} />
            </div>
            <div>
              <label className={labelClass}>Ville *</label>
              <input className={inputClass} placeholder="Paris" value={form.ville}
                onChange={e => set("ville", e.target.value)} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Téléphone</label>
              <input className={inputClass} placeholder="06 12 34 56 78" type="tel" value={form.telephone}
                onChange={e => set("telephone", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Adresse e-mail</label>
              <input className={inputClass} placeholder="marie.dupont@email.fr" type="email" value={form.email}
                onChange={e => set("email", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Étape 3 : Situation ── */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Situation familiale *</label>
            <div className="grid grid-cols-2 gap-2">
              {situationFamilialeOptions.map(opt => (
                <button key={opt} onClick={() => set("situationFamiliale", opt)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left
                    ${form.situationFamiliale === opt ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Nombre d&apos;enfants à charge</label>
            <div className="flex items-center gap-3">
              <button onClick={() => set("nombreEnfants", String(Math.max(0, parseInt(form.nombreEnfants) - 1)))}
                className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 text-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center">
                −
              </button>
              <span className="w-12 text-center text-2xl font-bold text-slate-800">{form.nombreEnfants}</span>
              <button onClick={() => set("nombreEnfants", String(parseInt(form.nombreEnfants) + 1))}
                className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 text-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center">
                +
              </button>
            </div>
          </div>
          <div>
            <label className={labelClass}>Situation professionnelle *</label>
            <div className="grid grid-cols-2 gap-2">
              {situationProOptions.map(opt => (
                <button key={opt} onClick={() => set("situationPro", opt)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left
                    ${form.situationPro === opt ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Revenu mensuel net (€)</label>
            <input className={inputClass} placeholder="1 500" type="number" min="0" value={form.revenuMensuel}
              onChange={e => set("revenuMensuel", e.target.value)} />
            <p className="text-xs text-slate-400 mt-1">Revenu de l&apos;ensemble du foyer fiscal</p>
          </div>
        </div>
      )}

      {/* ── Étape 4 : Numéros ── */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex gap-2">
            <span className="text-base flex-shrink-0">🔒</span>
            <span>Ces informations restent uniquement dans votre navigateur et ne sont jamais transmises à nos serveurs.</span>
          </div>
          <div>
            <label className={labelClass}>Numéro de Sécurité Sociale</label>
            <input className={inputClass} placeholder="1 88 05 75 123 456 78" maxLength={21} value={form.numeroSS}
              onChange={e => set("numeroSS", e.target.value)} />
            <p className="text-xs text-slate-400 mt-1">15 chiffres — présent sur votre carte vitale</p>
          </div>
          <div>
            <label className={labelClass}>Numéro allocataire CAF</label>
            <input className={inputClass} placeholder="12345678" maxLength={9} value={form.numeroCaf}
              onChange={e => set("numeroCaf", e.target.value.replace(/\D/g, ""))} />
            <p className="text-xs text-slate-400 mt-1">7 chiffres — sur vos courriers CAF</p>
          </div>
          <div>
            <label className={labelClass}>IBAN (compte bancaire)</label>
            <input className={inputClass} placeholder="FR76 3000 1007 6712 3456 7890 185" maxLength={34}
              value={form.iban}
              onChange={e => set("iban", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/(.{4})/g, "$1 ").trim())} />
            <p className="text-xs text-slate-400 mt-1">Pour le versement des aides — sur votre RIB</p>
          </div>
        </div>
      )}

      {/* ── Étape 5 : Récapitulatif ── */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-semibold text-green-800">Votre profil est prêt !</p>
            <p className="text-sm text-green-600 mt-1">Copiez ces informations pour remplir vos formulaires administratifs</p>
          </div>

          {/* Récapitulatif structuré */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {[
              {
                title: "Identité", icon: "👤",
                fields: [
                  { label: "Nom complet", value: `${form.civilite} ${form.prenom} ${form.nom}` },
                  form.nomNaissance ? { label: "Nom de naissance", value: form.nomNaissance } : null,
                  form.dateNaissance ? { label: "Date de naissance", value: new Date(form.dateNaissance).toLocaleDateString("fr-FR") } : null,
                  form.lieuNaissance ? { label: "Lieu de naissance", value: `${form.lieuNaissance}${form.departementNaissance ? ` (${form.departementNaissance})` : ""}` } : null,
                  form.nationalite ? { label: "Nationalité", value: form.nationalite } : null,
                ].filter(Boolean),
              },
              {
                title: "Adresse", icon: "📍",
                fields: [
                  form.adresse ? { label: "Adresse", value: `${form.adresse}${form.complementAdresse ? `, ${form.complementAdresse}` : ""}` } : null,
                  (form.codePostal || form.ville) ? { label: "Ville", value: `${form.codePostal} ${form.ville}` } : null,
                  form.telephone ? { label: "Téléphone", value: form.telephone } : null,
                  form.email ? { label: "Email", value: form.email } : null,
                ].filter(Boolean),
              },
              {
                title: "Situation", icon: "👨‍👩‍👧",
                fields: [
                  form.situationFamiliale ? { label: "Situation familiale", value: form.situationFamiliale } : null,
                  { label: "Enfants à charge", value: form.nombreEnfants },
                  form.situationPro ? { label: "Situation professionnelle", value: form.situationPro } : null,
                  form.revenuMensuel ? { label: "Revenu mensuel net", value: `${form.revenuMensuel} €` } : null,
                ].filter(Boolean),
              },
              {
                title: "Numéros", icon: "🔢",
                fields: [
                  form.numeroSS ? { label: "N° Sécu", value: form.numeroSS } : null,
                  form.numeroCaf ? { label: "N° CAF", value: form.numeroCaf } : null,
                  form.iban ? { label: "IBAN", value: form.iban } : null,
                ].filter(Boolean),
              },
            ].map((section, si) => section.fields.length > 0 && (
              <div key={si} className="border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50">
                  <span>{section.icon}</span>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{section.title}</span>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {(section.fields as {label:string;value:string}[]).map((f, fi) => (
                    <div key={fi} className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-500 flex-shrink-0">{f.label}</span>
                      <span className="font-medium text-slate-800 text-right">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-2">
            <button onClick={copyToClipboard}
              className={`flex-1 flex items-center justify-center gap-2 py-3 font-semibold rounded-xl transition-all
                ${copied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
              {copied ? (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copié !</>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copier mes informations</>
              )}
            </button>
            <button onClick={() => setShowSaveModal(true)}
              className="flex items-center gap-2 px-4 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              Sauvegarder
            </button>
            <button onClick={reset}
              className="flex items-center gap-2 px-4 py-3 border border-red-200 text-red-500 font-medium rounded-xl hover:bg-red-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Réinitialiser
            </button>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700">
            <strong>Comment utiliser ?</strong> Cliquez &quot;Copier mes informations&quot;, puis collez (Ctrl+V) dans n&apos;importe quel formulaire administratif en ligne ou document Word.
          </div>
        </div>
      )}

      {/* Navigation entre étapes */}
      {step < 5 && (
        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
              ← Précédent
            </button>
          )}
          <button onClick={() => setStep(s => s + 1)}
            className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            {step === 4 ? "Voir mon profil →" : "Continuer →"}
          </button>
        </div>
      )}

      {/* Modal sauvegarde */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-scale-in">
            <h3 className="font-bold text-slate-800 mb-3">Nommer ce profil</h3>
            <input
              className={inputClass}
              placeholder="Ex: Mon profil principal"
              value={saveLabel}
              onChange={e => setSaveLabel(e.target.value)}
              onKeyDown={e => e.key === "Enter" && saveProfile()}
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button onClick={saveProfile}
                className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                Sauvegarder
              </button>
              <button onClick={() => setShowSaveModal(false)}
                className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-xl hover:bg-slate-50 transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

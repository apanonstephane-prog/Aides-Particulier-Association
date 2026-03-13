"use client";
import { useState, useRef, useCallback } from "react";

type CapturedDoc = {
  url: string;
  name: string;
  type: "photo" | "upload";
  date: string;
};

export default function DocumentScanner() {
  const [docs, setDocs] = useState<CapturedDoc[]>([]);
  const [isCamera, setIsCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<CapturedDoc | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* --- Upload fichier --- */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      setDocs(prev => [...prev, {
        url,
        name: file.name,
        type: "upload",
        date: new Date().toLocaleString("fr-FR"),
      }]);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* --- Caméra --- */
  const openCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      setStream(s);
      setIsCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
        }
      }, 100);
    } catch {
      setCameraError("Accès à la caméra refusé ou non disponible. Utilisez la galerie pour importer une photo.");
    }
  }, []);

  const closeCamera = useCallback(() => {
    stream?.getTracks().forEach(t => t.stop());
    setStream(null);
    setIsCamera(false);
  }, [stream]);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const url = canvas.toDataURL("image/jpeg", 0.92);
    const now = new Date();
    setDocs(prev => [...prev, {
      url,
      name: `Document_${now.toLocaleDateString("fr-FR").replace(/\//g, "-")}_${now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h")}.jpg`,
      type: "photo",
      date: now.toLocaleString("fr-FR"),
    }]);
    closeCamera();
  }, [closeCamera]);

  const deleteDoc = (index: number) => {
    setDocs(prev => {
      const next = [...prev];
      URL.revokeObjectURL(next[index].url);
      next.splice(index, 1);
      return next;
    });
    if (selectedDoc && docs[index] === selectedDoc) setSelectedDoc(null);
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      {!isCamera && (
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={openCamera}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-all text-center"
          >
            <span className="text-4xl">📷</span>
            <div>
              <p className="font-semibold text-blue-800 text-sm">Prendre une photo</p>
              <p className="text-xs text-blue-600 mt-0.5">Utiliser la caméra de votre appareil</p>
            </div>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 hover:border-indigo-400 hover:bg-indigo-100 transition-all text-center"
          >
            <span className="text-4xl">🖼️</span>
            <div>
              <p className="font-semibold text-indigo-800 text-sm">Importer depuis la galerie</p>
              <p className="text-xs text-indigo-600 mt-0.5">JPG, PNG, WEBP — depuis votre appareil</p>
            </div>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />

          {/* Mobile : photo directe */}
          <label className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-green-200 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-all text-center cursor-pointer sm:col-span-2">
            <span className="text-4xl">📱</span>
            <div>
              <p className="font-semibold text-green-800 text-sm">Photo directe (mobile)</p>
              <p className="text-xs text-green-600 mt-0.5">Ouvre directement l&apos;appareil photo sur mobile</p>
            </div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
      )}

      {/* Erreur caméra */}
      {cameraError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <span className="text-lg flex-shrink-0">⚠️</span>
          <span>{cameraError}</span>
        </div>
      )}

      {/* Vue caméra */}
      {isCamera && (
        <div className="space-y-3 animate-scale-in">
          <div className="relative rounded-2xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full max-h-[60vh] object-contain"
            />
            {/* Overlay de cadrage */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-3/4 h-3/4 border-2 border-white/50 rounded-xl"
                style={{
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <p className="text-xs text-center text-slate-500">Placez votre document dans le cadre blanc</p>
          <div className="flex gap-3">
            <button
              onClick={capture}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Capturer le document
            </button>
            <button
              onClick={closeCamera}
              className="px-4 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Galerie des documents capturés */}
      {docs.length > 0 && !isCamera && (
        <div>
          <h3 className="font-semibold text-slate-700 text-sm mb-3 flex items-center gap-2">
            <span>📁</span>
            Mes documents ({docs.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {docs.map((doc, i) => (
              <div
                key={i}
                className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedDoc(doc)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.url}
                  alt={doc.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="p-2 bg-white">
                  <p className="text-xs text-slate-600 truncate font-medium">{doc.name}</p>
                  <p className="text-xs text-slate-400">{doc.date}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteDoc(i); }}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visionneuse plein écran */}
      {selectedDoc && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDoc(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between bg-white rounded-t-2xl px-4 py-3">
              <span className="text-sm font-medium text-slate-700 truncate">{selectedDoc.name}</span>
              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <a
                  href={selectedDoc.url}
                  download={selectedDoc.name}
                  className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
                >
                  Télécharger
                </a>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedDoc.url}
              alt={selectedDoc.name}
              className="w-full max-h-[75vh] object-contain bg-white rounded-b-2xl"
            />
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 text-center">
        🔒 Vos documents restent uniquement sur votre appareil — aucune donnée n&apos;est envoyée sur internet
      </p>
    </div>
  );
}

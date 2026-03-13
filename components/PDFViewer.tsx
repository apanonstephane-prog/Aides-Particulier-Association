"use client";
import { useState, useRef } from "react";

export default function PDFViewer() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Veuillez sélectionner un fichier PDF.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setFileName(file.name);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleClose = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePrint = () => {
    if (!pdfUrl) return;
    const win = window.open(pdfUrl);
    win?.print();
  };

  return (
    <div className="space-y-4">
      {!pdfUrl ? (
        /* Zone de dépôt */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDragging(false)}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer
            ${isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
            }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="text-5xl mb-4">📄</div>
          <p className="text-lg font-semibold text-slate-700 mb-2">
            Glissez votre PDF ici
          </p>
          <p className="text-sm text-slate-500 mb-4">
            ou cliquez pour sélectionner un fichier
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Choisir un fichier PDF
          </span>
          <p className="text-xs text-slate-400 mt-3">
            Vos documents restent sur votre appareil — rien n&apos;est envoyé sur internet
          </p>
        </div>
      ) : (
        /* Visionneuse PDF */
        <div className="space-y-3">
          {/* Barre d'outils */}
          <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl flex-shrink-0">📄</span>
              <span className="text-sm font-medium text-slate-700 truncate">{fileName}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
              <a
                href={pdfUrl}
                download={fileName}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Télécharger
              </a>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimer
              </button>
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Fermer
              </button>
            </div>
          </div>

          {/* Iframe PDF */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              src={pdfUrl}
              className="w-full"
              style={{ height: "65vh", minHeight: "400px" }}
              title={fileName}
            />
          </div>

          <p className="text-xs text-slate-400 text-center">
            🔒 Ce document reste uniquement sur votre appareil — aucune donnée n&apos;est transmise
          </p>
        </div>
      )}
    </div>
  );
}

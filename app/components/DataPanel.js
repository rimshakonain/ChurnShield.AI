"use client";

import { useTransition, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { exportTelemetryCSVAction, importTelemetryCSVAction, flushSystemLogsAction } from "../actions/pipeline";

export default function DataPanel() {
  const [isPending, startTransition] = useTransition();
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // 🌟 Custom inline alert state tracker
  const fileInputRef = useRef(null);
  const router = useRouter();

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const processCSVText = async (text) => {
    setUploadStatus("IMPORTING...");
    
    startTransition(async () => {
      try {
        const result = await importTelemetryCSVAction(text);

        if (!result || !result.success) {
          throw new Error(result?.error || "Ingestion pipeline failed");
        }

        setUploadStatus(`SUCCESS: +${result.batchCount} NODES`);
        router.refresh(); 
        setTimeout(() => setUploadStatus(""), 4000);
      } catch (error) {
        setUploadStatus("PIPELINE ERROR");
        console.error(error);
      }
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    executeFileReader(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setUploadStatus("INVALID FILE: MUST BE .CSV");
      setTimeout(() => setUploadStatus(""), 3000);
      return;
    }

    executeFileReader(file);
  };

  const executeFileReader = (file) => {
    setUploadStatus("READING...");
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text !== "string") {
        setUploadStatus("READ ERROR");
        return;
      }
      processCSVText(text);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragActive) setIsDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const handleDownload = () => {
    startTransition(async () => {
      try {
        const result = await exportTelemetryCSVAction();
        if (!result || !result.success) throw new Error(result?.error || "Extraction failed");

        const blob = new Blob([result.csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        link.setAttribute("href", url);
        link.setAttribute("download", "telemetry_export.csv");
        link.style.visibility = "hidden";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.error("Export failed:", e);
        setUploadStatus("EXPORT FAILED");
        setTimeout(() => setUploadStatus(""), 3000);
      }
    });
  };

  // 🗑️ INLINE EXECUTOR PURGE MECHANISM (Completely bypasses raw window alerts)
  const handleSystemFlush = () => {
    setShowConfirm(false);
    setUploadStatus("FLUSHING...");
    
    startTransition(async () => {
      try {
        const result = await flushSystemLogsAction();
        if (!result || !result.success) throw new Error(result?.error || "Purge failed");
        
        setUploadStatus("LOGS PURGED ✓");
        router.refresh();
        setTimeout(() => setUploadStatus(""), 3000);
      } catch (e) {
        setUploadStatus("PURGE FAILED");
        setTimeout(() => setUploadStatus(""), 3000);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-xl p-5 font-mono text-[11px] gap-4 transition-all duration-200 ${
          isDragActive 
            ? "border-emerald-500 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
            : "border-zinc-900 bg-zinc-900/10"
        }`}
      >
        <div className="space-y-1">
          <span className="font-bold text-zinc-300">
            {isDragActive ? "🤖 READY TO INGEST DATASET..." : "// PLATFORM_DATA_UTILITIES"}
          </span>
          <p className="text-[10px] text-zinc-500 leading-normal">
            {isDragActive 
              ? "Release file anywhere within boundaries to execute matrix parsing" 
              : "Drag and drop your node CSV directly here, or use explicit action selectors"}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          {/* Status Tracer Logs */}
          {uploadStatus && (
            <span className="text-[10px] text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2.5 py-1 rounded uppercase tracking-tight animate-pulse">
              {"// STATUS: "}{uploadStatus}
            </span>
          )}

          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
            disabled={isPending}
          />

          {/* Standard buttons disappear if confirm state is engaged to focus intent */}
          {!showConfirm && (
            <>
              <button
                onClick={triggerFileInput}
                disabled={isPending}
                className={`px-3 py-1.5 rounded border text-zinc-300 cursor-pointer font-bold uppercase transition-all tracking-tight disabled:opacity-40 disabled:cursor-not-allowed ${
                  isDragActive
                    ? "border-emerald-600 bg-emerald-950/20 text-emerald-300"
                    : "border-zinc-800 bg-zinc-900/50 hover:text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700"
                }`}
              >
                {isPending ? "PROCESSING..." : "SELECT FILE 📤"}
              </button>

              <button
                onClick={handleDownload}
                disabled={isPending}
                className="px-3 py-1.5 rounded border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700 cursor-pointer font-bold uppercase transition-all tracking-tight disabled:opacity-50"
              >
                EXPORT CSV 📥
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                disabled={isPending}
                className="px-3 py-1.5 rounded border border-zinc-900/60 bg-rose-950/10 text-rose-400 hover:bg-rose-900/20 hover:text-rose-300 cursor-pointer font-bold uppercase transition-all tracking-tight disabled:opacity-40"
              >
                FLUSH LOGS 🗑️
              </button>
            </>
          )}

          {/* ⚠️ HIGH-VISIBILITY CYBERNETIC INLINE CONFIRMATION TOGGLE CONTAINER */}
          {showConfirm && (
            <div className="flex items-center gap-2 border border-rose-900/40 bg-rose-950/5 px-3 py-1.5 rounded-lg animate-in fade-in zoom-in-95 duration-150">
              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-tight animate-pulse pr-1">
                ⚠️ CONFIRM FULL PURGE?
              </span>
              
              <button
                onClick={handleSystemFlush}
                disabled={isPending}
                className="px-2 py-1 rounded border border-rose-700 bg-rose-900 text-white font-black uppercase text-[10px] hover:bg-rose-800 transition-all cursor-pointer shadow-[0_0_10px_rgba(244,63,94,0.2)]"
              >
                EXECUTE
              </button>
              
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="px-2 py-1 rounded border border-zinc-800 bg-zinc-900 text-zinc-400 font-bold uppercase text-[10px] hover:text-zinc-200 transition-all cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

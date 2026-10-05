import React, { useState } from 'react';
import { AspectRatio } from '../types';
import { exportElementAsImage, copyElementToClipboard, getExportDimensions } from '../utils/exportImage';
import { Download, Copy, Check, X, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  aspectRatio: AspectRatio;
  canvasElement: HTMLElement | null;
  defaultTitle?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  aspectRatio,
  canvasElement,
  defaultTitle = 'editorial-news-post',
}) => {
  const [scale, setScale] = useState<number>(2); // 2x by default for crisp 2K / 2160px
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [filename, setFilename] = useState<string>(
    defaultTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30) || 'editorial-post'
  );
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const dimensions = getExportDimensions(aspectRatio, scale);

  const handleDownload = async () => {
    if (!canvasElement) {
      setErrorMsg('Canvas element not ready for export.');
      return;
    }
    setIsExporting(true);
    setErrorMsg(null);
    try {
      await exportElementAsImage(canvasElement, {
        scale,
        format,
        filename: filename.trim() || 'editorial-post',
      });
      setTimeout(() => {
        setIsExporting(false);
      }, 500);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to generate high-resolution image');
      setIsExporting(false);
    }
  };

  const handleCopyClipboard = async () => {
    if (!canvasElement) return;
    setIsExporting(true);
    setErrorMsg(null);
    try {
      const success = await copyElementToClipboard(canvasElement, scale);
      setIsExporting(false);
      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      } else {
        setErrorMsg('Browser does not allow direct image clipboard access; use Download instead.');
      }
    } catch (err: any) {
      setIsExporting(false);
      setErrorMsg(err.message || 'Clipboard copy failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl space-y-4 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Export High-Resolution Post</h2>
          </div>
          <p className="text-xs text-neutral-400">
            Export pixel-perfect vector-sharp typography and high-fidelity social graphics.
          </p>
        </div>

        {/* Dimensions Stat Banner */}
        <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-bold text-xs">
              {scale}x
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">
                {dimensions.width} × {dimensions.height} px
              </div>
              <div className="text-[11px] text-neutral-400">
                {aspectRatio} Aspect Ratio ({format.toUpperCase()})
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
              {scale >= 3 ? 'Ultra 4K Crisp' : scale === 2 ? 'Super High-Res' : 'Standard Web'}
            </span>
          </div>
        </div>

        {/* Resolution Quality Multiplier */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-300">
            Export Resolution Multiplier
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { val: 1, label: '1x Web', desc: '1080p' },
              { val: 2, label: '2x High', desc: '2160p' },
              { val: 3, label: '3x Ultra', desc: '3240p' },
              { val: 4, label: '4x Print', desc: '4320p' },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => setScale(s.val)}
                className={`py-2 px-1 rounded-lg border text-center transition ${
                  scale === s.val
                    ? 'bg-neutral-800 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                    : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <div className="font-bold text-xs">{s.label}</div>
                <div className="text-[10px] text-neutral-500 font-mono">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* File Format & Filename */}
        <div className="grid grid-cols-2 gap-3">
          {/* Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Format</label>
            <div className="flex rounded-lg bg-neutral-950 p-1 border border-neutral-800 text-xs">
              <button
                onClick={() => setFormat('png')}
                className={`flex-1 py-1 rounded font-medium transition ${
                  format === 'png'
                    ? 'bg-neutral-800 text-cyan-400 shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                PNG (Lossless)
              </button>
              <button
                onClick={() => setFormat('jpeg')}
                className={`flex-1 py-1 rounded font-medium transition ${
                  format === 'jpeg'
                    ? 'bg-neutral-800 text-cyan-400 shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                JPEG
              </button>
            </div>
          </div>

          {/* Filename */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">Filename</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="post-title"
              className="w-full px-2.5 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white font-mono focus:outline-hidden focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          {/* Copy to Clipboard */}
          <button
            onClick={handleCopyClipboard}
            disabled={isExporting}
            className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied Image!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-300" />
                <span>Copy Image</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                <span>Generating High-Res...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-neutral-950" />
                <span>Download {format.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

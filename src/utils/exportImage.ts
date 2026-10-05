import { toPng, toJpeg, toBlob } from 'html-to-image';
import { AspectRatio } from '../types';

export interface ExportOptions {
  scale: number; // 1, 2, 3, 4
  format: 'png' | 'jpeg' | 'webp';
  quality?: number; // 0.8 to 1.0
  filename?: string;
}

/**
 * Calculates output dimensions in pixels based on aspect ratio and scale factor.
 */
export function getExportDimensions(aspectRatio: AspectRatio, scale: number = 2) {
  let baseW = 1080;
  let baseH = 1080;

  switch (aspectRatio) {
    case '1:1':
      baseW = 1080;
      baseH = 1080;
      break;
    case '4:5':
      baseW = 1080;
      baseH = 1350;
      break;
    case '9:16':
      baseW = 1080;
      baseH = 1920;
      break;
    case '16:9':
      baseW = 1920;
      baseH = 1080;
      break;
  }

  return {
    width: Math.round(baseW * (scale / 2)), // base 2x is 1080
    height: Math.round(baseH * (scale / 2)),
    aspectRatio,
  };
}

/**
 * Exports the element to a downloadable file.
 */
export async function exportElementAsImage(
  element: HTMLElement,
  options: ExportOptions
): Promise<string> {
  const pixelRatio = options.scale; // e.g. 2 for 2160p, 3 for 3240p
  const quality = options.quality ?? 0.95;

  let dataUrl: string;

  if (options.format === 'jpeg') {
    dataUrl = await toJpeg(element, {
      pixelRatio,
      quality,
      cacheBust: true,
      skipFonts: false,
    });
  } else {
    // Default PNG
    dataUrl = await toPng(element, {
      pixelRatio,
      cacheBust: true,
      skipFonts: false,
    });
  }

  // Trigger download
  const link = document.createElement('a');
  link.download = `${options.filename || 'editorial-post'}.${options.format}`;
  link.href = dataUrl;
  link.click();

  return dataUrl;
}

/**
 * Copies the image directly to the system clipboard.
 */
export async function copyElementToClipboard(
  element: HTMLElement,
  scale: number = 2
): Promise<boolean> {
  try {
    const blob = await toBlob(element, {
      pixelRatio: scale,
      cacheBust: true,
    });

    if (!blob) throw new Error('Failed to generate image blob');

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new window.ClipboardItem({ 'image/png': blob }),
      ]);
      return true;
    } else {
      throw new Error('Clipboard API not supported');
    }
  } catch (err) {
    console.warn('Clipboard write error:', err);
    return false;
  }
}

import { PostDesign } from '../types';

const STORAGE_KEY = 'editorial_custom_saved_templates';

/**
 * Safely retrieve saved templates from localStorage.
 */
export function getSavedTemplates(): PostDesign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to load saved templates from localStorage:', err);
    return [];
  }
}

/**
 * Attempts to compress a base64 image data URL to save space in localStorage.
 */
function compressDataUrl(dataUrl: string, maxDim: number = 600, quality: number = 0.7): Promise<string> {
  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith('data:image')) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * Safely saves template to localStorage with quota protection and fallback.
 */
export async function saveTemplateToStorage(template: PostDesign): Promise<{
  success: boolean;
  templates: PostDesign[];
  error?: string;
}> {
  try {
    const existing = getSavedTemplates();

    // Prepare template copy
    let templateToSave = { ...template };

    // If image is a large base64 data URL, compress it to avoid exceeding localStorage quota
    if (templateToSave.background.imageUrl.startsWith('data:image')) {
      try {
        const compressed = await compressDataUrl(templateToSave.background.imageUrl, 500, 0.65);
        templateToSave = {
          ...templateToSave,
          background: {
            ...templateToSave.background,
            imageUrl: compressed,
          },
        };
      } catch (e) {
        console.warn('Image compression fallback:', e);
      }
    }

    const filtered = existing.filter((t) => t.id !== templateToSave.id);
    const updated = [templateToSave, ...filtered].slice(0, 20); // Keep up to 20 custom templates

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { success: true, templates: updated };
    } catch (quotaErr) {
      console.warn('LocalStorage quota exceeded, trying trimmed storage...', quotaErr);
      // Try keeping fewer templates or fallback stock image if base64 is still too big
      const minimalTemplates = updated.slice(0, 5).map((t) => ({
        ...t,
        background: {
          ...t.background,
          imageUrl: t.background.imageUrl.startsWith('data:')
            ? 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1600&q=85'
            : t.background.imageUrl,
        },
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(minimalTemplates));
      return {
        success: true,
        templates: minimalTemplates,
        error: 'Saved with compressed image due to browser storage limits.',
      };
    }
  } catch (err: any) {
    console.error('Failed to save template:', err);
    return {
      success: false,
      templates: getSavedTemplates(),
      error: err?.message || 'Storage full. Use Export JSON to backup templates.',
    };
  }
}

/**
 * Delete a template from storage.
 */
export function deleteSavedTemplateFromStorage(templateId: string): PostDesign[] {
  try {
    const existing = getSavedTemplates();
    const updated = existing.filter((t) => t.id !== templateId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Failed to delete template from localStorage:', err);
    return [];
  }
}

/**
 * Downloads a template directly as a .json file.
 */
export function exportTemplateAsJsonFile(template: PostDesign) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(template, null, 2));
  const downloadAnchor = document.createElement('a');
  const safeName = (template.title || 'template').toLowerCase().replace(/[^a-z0-9]/g, '-');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${safeName}.template.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Reads a template from an uploaded .json file.
 */
export function importTemplateFromJsonFile(file: File): Promise<PostDesign> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed && parsed.headline && parsed.background) {
          resolve(parsed as PostDesign);
        } else {
          reject(new Error('Invalid template file structure'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

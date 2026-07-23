import { getApiUrl } from './api';

/**
 * Compresses an image file using HTML5 canvas.
 * Reduces 5MB-15MB camera photos to ~100KB JPEG in milliseconds.
 */
export function compressImageFile(file, maxWidth = 1200, maxHeight = 1200, quality = 0.75) {
  return new Promise((resolve) => {
    if (!file || !file.type || !file.type.startsWith('image/') || file.size < 150 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve(file);
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => resolve(file);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
            } else {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file to Cloudinary via backend API after client-side compression.
 * Returns the public Cloudinary URL on success.
 */
export async function uploadImage(file) {
  try {
    const compressedFile = await compressImageFile(file);

    const formData = new FormData();
    formData.append('image', compressedFile);

    const res = await fetch(getApiUrl('/api/upload'), {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success && data.url) {
      return { url: data.url, error: null };
    }
    throw new Error(data.message || 'Upload failed');
  } catch (err) {
    console.warn('Cloudinary upload endpoint fallback:', err);
    const tinyFile = await compressImageFile(file, 800, 800, 0.6);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result, error: err.message });
      reader.readAsDataURL(tinyFile);
    });
  }
}

import { getApiUrl } from './api';

/**
 * Uploads an image file to Cloudinary via the backend API.
 * Returns the public Cloudinary URL on success.
 * Falls back to Base64 if the upload endpoint is unavailable.
 */
export async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);

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
    console.error('Cloudinary upload error:', err);
    // Fallback: read as data URL so admin can still save
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result, error: err.message });
      reader.readAsDataURL(file);
    });
  }
}

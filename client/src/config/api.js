// Central API URL resolver for local dev, Vercel, and Render deployments

const DEFAULT_PROD_URL = 'https://bloosonbyvartika.onrender.com';

export const getApiUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // Use VITE_API_URL env var if available, else default to live Render backend URL
  const baseUrl = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? DEFAULT_PROD_URL : '');
  
  if (baseUrl) {
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  }

  return path;
};

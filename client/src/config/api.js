// Central API URL resolver for local dev, Vercel, and Render deployments

export const getApiUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    const cleanBase = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  }

  return path;
};

export const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800';

export function getProductImages(product) {
  if (!product) return [DEFAULT_PRODUCT_IMAGE];
  let imgs = [];
  if (Array.isArray(product.images)) {
    imgs = product.images.filter(img => typeof img === 'string' && img.trim().length > 0);
  }
  if (imgs.length === 0 && typeof product.imageUrl === 'string' && product.imageUrl.trim().length > 0) {
    imgs.push(product.imageUrl);
  }
  if (imgs.length === 0 && typeof product.image === 'string' && product.image.trim().length > 0) {
    imgs.push(product.image);
  }
  if (imgs.length === 0) {
    imgs.push(DEFAULT_PRODUCT_IMAGE);
  }
  return imgs;
}

export function getProductMainImage(product) {
  const imgs = getProductImages(product);
  return imgs[0] || DEFAULT_PRODUCT_IMAGE;
}

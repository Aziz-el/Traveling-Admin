export const optimizeImageUrl = (url: string|undefined, width: number = 400, quality: number = 85): string|undefined => {
  if (url == undefined) return url;
  
  if (url.includes('unsplash.com')) {
    return `${url}${url.includes('?') ? '&' : '?'}w=${width}&q=${quality}&auto=format&fit=crop`;
  }
  
  if (url.includes('images.pexels.com')) {
    return `${url}${url.includes('?') ? '&' : '?'}auto=compress&w=${width}`;
  }
  
  return url;
};

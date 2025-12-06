import React, { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function ImageWithFallback({ src, alt, fallback, className, ...props }: Props) {
  const [error, setError] = useState(false);

  const placeholder = fallback || 'https://via.placeholder.com/150?text=No+Image';

  return (
    <img
      src={error ? placeholder : (src as string) || placeholder}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

export default ImageWithFallback;

/**
 * Wrapper that serves WebP with JPG/PNG fallback via <picture>.
 * Adds native lazy loading + async decoding for below-fold images.
 */

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Set to true for above-fold images (LCP candidates) */
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  priority = false,
  ...rest
}: OptimizedImageProps) {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const isImage = /\.(jpg|jpeg|png)$/i.test(src);

  if (!isImage) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" } : {})}
        {...rest}
      />
    );
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" } : {})}
        {...rest}
      />
    </picture>
  );
}

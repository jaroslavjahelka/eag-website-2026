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
  const isLocalImage = /\.(jpg|jpeg|png)$/i.test(src) && !src.startsWith("http");
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  /* External images (e.g. WordPress uploads) — no WebP alternative exists,
     so skip the <picture> wrapper to avoid ORB / 404 failures */
  if (!isLocalImage) {
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
    <picture className="contents">
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

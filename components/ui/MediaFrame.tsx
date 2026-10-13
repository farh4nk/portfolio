import Image from "next/image";

// Shows the image if it exists, otherwise a blueprint placeholder naming the file it is waiting for.
export function MediaFrame({
  src,
  alt,
  pending,
  sizes,
  className = "",
  imageClassName = "",
  focus = "top",
  priority = false,
}: {
  src?: string;
  alt: string;
  pending: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  focus?: "top" | "center";
  /** The LCP image: fetch it eagerly at high priority (Next 16 prefers this over `preload`). */
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-bg ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} loading={priority ? "eager" : undefined} fetchPriority={priority ? "high" : undefined} className={`object-cover ${focus === "center" ? "object-center" : "object-top"} ${imageClassName}`} />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <svg aria-hidden className="absolute inset-0 h-full w-full text-rule" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="label-mono relative bg-bg px-2 normal-case">[ {pending} ]</span>
        </div>
      )}
    </div>
  );
}

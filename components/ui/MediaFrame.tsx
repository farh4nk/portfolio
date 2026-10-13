import Image from "next/image";

// Shows the image if it exists, otherwise a blueprint placeholder naming the file it is waiting for.
export function MediaFrame({
  src,
  alt,
  pending,
  sizes,
  className = "",
}: {
  src?: string;
  alt: string;
  pending: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-bg ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
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

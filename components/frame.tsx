import Image from "next/image";

export type FrameShape =
  | "arch"
  | "circle"
  | "pebble"
  | "leaf"
  | "pill"
  | "wide"
  | "slit"
  | "soft";

export type FramePlate = "ink" | "laterite" | "green" | "teak" | "none";

type FrameProps = {
  shape?: FrameShape;
  plate?: FramePlate;
  position?: string;
  speed?: number;
  alt?: string;
  caption?: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
};

export function Frame({
  shape = "arch",
  plate = "ink",
  position = "50% 50%",
  speed = 28,
  alt = "",
  caption,
  className = "",
  sizes = "(max-width: 979px) 92vw, 40vw",
  preload = false,
}: FrameProps) {
  return (
    <figure className={`frame shape-${shape} plate-${plate} ${className}`.trim()}>
      <span className="frame-stroke" aria-hidden="true" />
      <div className="frame-clip">
        <div
          className="frame-media"
          style={{
            ["--range" as string]: `${Math.abs(speed)}px`,
            animationDirection: speed < 0 ? "reverse" : "normal",
          }}
        >
          <Image
            src="/verandah.webp"
            alt={alt}
            fill
            preload={preload}
            sizes={sizes}
            style={{ objectFit: "cover", objectPosition: position }}
          />
        </div>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

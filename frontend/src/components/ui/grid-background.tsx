import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  size?: number;
}

export function GridBackground({
  className,
  size = 48,
  ...props
}: React.ComponentProps<"div"> & GridBackgroundProps) {
  return (
    <div
      className={cn("fixed inset-0 z-[-1] opacity-20", className)}
      style={{
        backgroundImage: `linear-gradient(to right, var(--muted-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--muted-foreground) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
      {...props}
    />
  );
}

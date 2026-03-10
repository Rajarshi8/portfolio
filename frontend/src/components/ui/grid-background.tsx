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
      className={cn(
        "fixed inset-0 z-[-1] opacity-20",
        "bg-[image:linear-gradient(to_right,var(--muted-foreground),transparent_1px),linear-gradient(to_bottom,var(--muted-foreground),transparent_1px)]",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
      }}
      {...props}
    />
  );
}

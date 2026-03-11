import { useState } from "react";
import { Calendar, MapPin, Code2 } from "lucide-react";

export interface ExpandCardItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  tech?: string[];
}

interface ExpandCardsProps {
  items: ExpandCardItem[];
}

const ACCENT_COLORS = [
  "from-violet-600 to-indigo-700",
  "from-purple-600 to-violet-700",
  "from-indigo-600 to-blue-700",
  "from-fuchsia-600 to-purple-700",
  "from-blue-600 to-indigo-700",
  "from-violet-500 to-purple-600",
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ExpandCards({ items }: ExpandCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="w-full">
      {/* Desktop: horizontal accordion */}
      <div className="hidden md:flex w-full items-stretch gap-2 h-[420px]">
        {items.map((item, idx) => {
          const isExpanded = idx === expandedIndex;
          const accentGradient = ACCENT_COLORS[idx % ACCENT_COLORS.length];

          return (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl cursor-pointer border border-border-light dark:border-border-dark transition-all duration-500 ease-in-out flex-shrink-0"
              style={{
                width: isExpanded ? "min(480px, 55%)" : "56px",
                minWidth: isExpanded ? "min(480px, 55%)" : "56px",
              }}
              onClick={() => setExpandedIndex(idx)}
            >
              {/* Gradient background strip (always visible) */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-90`}
              />

              {/* Dark overlay for expanded card */}
              {isExpanded && (
                <div className="absolute inset-0 bg-card-light dark:bg-card-dark" />
              )}

              {/* Collapsed: vertical title */}
              {!isExpanded && (
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-1 gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 flex-shrink-0">
                    <Code2 className="w-4 h-4 text-white" />
                  </div>
                  <p
                    className="text-white text-xs font-semibold tracking-wide leading-tight"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                      maxHeight: "260px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.role}
                  </p>
                </div>
              )}

              {/* Expanded: full content */}
              {isExpanded && (
                <div className="relative z-10 h-full flex flex-col p-5 overflow-y-auto">
                  {/* Accent top bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 mb-4 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br ${accentGradient} text-white`}
                  >
                    <Code2 className="w-5 h-5" />
                  </div>

                  {/* Title + badge */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-text-light dark:text-text-dark leading-snug pr-2">
                      {item.role}
                    </h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium flex-shrink-0">
                      Hackathon
                    </span>
                  </div>

                  {/* Team */}
                  <p className="text-primary font-medium mb-2 text-sm">
                    {item.company}
                  </p>

                  {/* Date + Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted-light dark:text-text-muted-dark mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.startDate)}
                      {" - "}
                      {item.current
                        ? "Present"
                        : item.endDate
                        ? formatDate(item.endDate)
                        : ""}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark leading-relaxed flex-1">
                    {item.description}
                  </p>

                  {/* Tech stack */}
                  {item.tech && item.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tech.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map((item, idx) => {
          const isExpanded = idx === expandedIndex;
          const accentGradient = ACCENT_COLORS[idx % ACCENT_COLORS.length];

          return (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-border-light dark:border-border-dark cursor-pointer transition-all duration-300"
              onClick={() => setExpandedIndex(idx)}
            >
              {/* Accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`}
              />

              {/* Collapsed header */}
              <div className="flex items-center gap-3 p-4">
                <div
                  className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br ${accentGradient} text-white`}
                >
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-light dark:text-text-dark truncate">
                    {item.role}
                  </p>
                  <p className="text-xs text-primary truncate">{item.company}</p>
                </div>
                <span
                  className={`text-xs transition-transform duration-300 text-text-muted-light dark:text-text-muted-dark ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* Expanded body */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border-light dark:border-border-dark">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted-light dark:text-text-muted-dark mt-3 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.startDate)}
                      {" - "}
                      {item.current
                        ? "Present"
                        : item.endDate
                        ? formatDate(item.endDate)
                        : ""}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {item.tech && item.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

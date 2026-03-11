import { useState, useEffect } from "react";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 3000;

  useEffect(() => {
    if (!copied) return;

    const showTimer = setTimeout(() => setShowConfirmation(true), 400);
    setProgress(0);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setShowConfirmation(false);
        setTimeout(() => {
          setCopied(false);
          setProgress(0);
        }, 400);
      }
    }, 16);

    return () => {
      clearInterval(interval);
      clearTimeout(showTimer);
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.cssText = "position:fixed;left:-9999px;top:-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center bg-[#1f1f1e] rounded-full px-6 py-2.5 h-12 w-full">
      {/* Progress fill */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-[#2a2a29] rounded-full"
        style={{
          width: `${progress}%`,
          opacity: copied ? 1 : 0,
          transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Default: email + Copy button */}
      <div
        className="absolute inset-0 flex items-center justify-between pl-5 pr-2"
        style={{
          opacity: copied ? 0 : 1,
          filter: copied ? "blur(12px)" : "blur(0px)",
          transform: copied ? "scale(0.92)" : "scale(1)",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: copied ? "none" : "auto",
          zIndex: copied ? 0 : 20,
        }}
      >
        <span className="text-sm text-[#6b6b6a] truncate max-w-[180px] select-all">
          {email}
        </span>
        <button
          onClick={handleCopy}
          className="bg-[#2a2a29] hover:bg-[#353534] text-[#e5e5e4] text-sm font-medium px-5 py-2 rounded-full shadow-black/30 transition-all duration-200 hover:shadow-black/50 active:scale-95 cursor-pointer select-none flex-shrink-0 ml-3"
        >
          Copy
        </button>
      </div>

      {/* Confirmation: Email Copied! */}
      <div
        className="relative flex items-center gap-2.5"
        style={{
          opacity: showConfirmation ? 1 : 0,
          filter: showConfirmation ? "blur(0px)" : "blur(12px)",
          transform: showConfirmation ? "scale(1)" : "scale(1.08)",
          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div className="w-6 h-6 bg-[#e5e5e4] rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3.5 h-3.5 text-[#141413]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: showConfirmation ? 0 : 24,
                transition:
                  "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
              }}
            />
          </svg>
        </div>
        <span className="text-sm font-semibold text-[#e5e5e4] whitespace-nowrap">
          Email Copied!
        </span>
      </div>
    </div>
  );
}

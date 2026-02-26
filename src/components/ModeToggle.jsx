import React, { useState, useEffect } from "react";

export default function ModeToggle({ mode, setMode }) {
  const isCourt = mode === "court";
  const [anim, setAnim] = useState(false);

  const toggle = () => setMode(isCourt ? "nyaya" : "court");

  useEffect(() => {
    setAnim(true);
    const t = setTimeout(() => setAnim(false), 420);
    return () => clearTimeout(t);
  }, [mode]);

  return (
    <div className="flex items-center justify-center">
      <button
        role="switch"
        aria-checked={isCourt}
        aria-label={isCourt ? "Court Room mode" : "NyayaBot mode"}
        onClick={toggle}
        className="
          relative
          flex
          h-11
          w-60
          rounded-full
          bg-[#0b1220]
          border
          border-gray-800
          p-1
          text-sm
          select-none
          overflow-hidden
        "
      >
        {/* Active sliding pill */}
        <span
          className={`
            absolute
            top-1
            left-1
            h-9
            w-1/2
            rounded-full
            bg-[#10a37f]
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1.4,0.36,1)]
            ${isCourt ? "translate-x-full" : ""}
            ${anim ? "scale-[1.06]" : ""}
          `}
        />

        {/* Energy pulse ring (crazy but subtle) */}
        <span
          className={`
            pointer-events-none
            absolute
            inset-0
            rounded-full
            ${anim ? "animate-toggle-pulse" : ""}
          `}
        />

        {/* NyayaBot label */}
        <span
          className={`
            relative
            z-10
            flex-1
            flex
            items-center
            justify-center
            transition-all
            duration-300
            ${!isCourt
              ? "font-extrabold text-[#061028] translate-y-[-0.5px]"
              : "font-medium text-gray-400"
            }
          `}
        >
          NyayaBot
        </span>

        {/* Court Room label */}
        <span
          className={`
            relative
            z-10
            flex-1
            flex
            items-center
            justify-center
            transition-all
            duration-300
            ${isCourt
              ? "font-extrabold text-[#061028] translate-y-[-0.5px]"
              : "font-medium text-gray-400"
            }
          `}
        >
          Court Room
        </span>

        {/* Local animations */}
        <style>{`
          @keyframes toggle-pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(16,163,127,0.35);
            }
            70% {
              box-shadow: 0 0 0 14px rgba(16,163,127,0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(16,163,127,0);
            }
          }

          .animate-toggle-pulse {
            animation: toggle-pulse 420ms ease-out;
          }
        `}</style>
      </button>
    </div>
  );
}

// components/SidebarLogoMenu.jsx
import React, { useState } from "react";

export default function SidebarLogoMenu({ mode, setMode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-2">
      {/* Logo Row (toggle trigger) */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          w-full
          flex
          items-center
          gap-3
          px-2
          py-3
          rounded-md
          hover:bg-[#0b1b26]
          transition
        "
      >
        <div className="h-11 w-11 rounded-md bg-[#10a37f] flex items-center justify-center text-black font-bold">
          N
        </div>

        <div className="flex-1 text-left">
          <div className="text-sm font-semibold">NyayaConnect</div>
          <div className="text-xs text-gray-400">
            {mode === "court" ? "Court Room" : "Legal assistant"}
          </div>
        </div>

        <span
          className={`
            text-gray-400
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        >
          ▾
        </span>
      </button>

      {/* Inline expandable section */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ease-linear
          ${open ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}
        `}
      >
        <div className="rounded-md border border-gray-800 bg-[#061320]">
          <button
            onClick={() => setMode("nyaya")}
            className={`
              w-full
              text-left
              px-3
              py-2
              text-sm
              transition
              ${
                mode === "nyaya"
                  ? "bg-[#0b1b26] text-white font-semibold"
                  : "text-gray-300 hover:bg-[#081827]"
              }
            `}
          >
            Chat Assistant
            <div className="text-xs text-gray-400">Ask legal questions</div>
          </button>

          <button
            onClick={() => setMode("appointments")}
            className={`
              w-full
              text-left
              px-3
              py-2
              text-sm
              transition
              ${
                mode === "appointments"
                  ? "bg-[#0b1b26] text-white font-semibold"
                  : "text-gray-300 hover:bg-[#081827]"
              }
            `}
          >
          Appointments
            <div className="text-xs text-gray-400">Book a lawyer consultation</div>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLinks() {
  const pathname = usePathname();

  const navItems = [
    { index: "[H]", label: "HOME_LANDING", path: "/" },
    { index: "[0]", label: "OVERVIEW_MONITOR", path: "/dashboard" },
    { index: "[1]", label: "RISK_STRATIFICATION", path: "/dashboard/predictions" },
    { index: "[2]", label: "K_MEANS_CLUSTERS", path: "/dashboard/segments" }
  ];

  return (
    <nav className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500">
      {navItems.map((item) => {
        // Enforce strict route matching to avoid accidental overlay highlights
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded border transition-all select-none ${
              isActive
                ? "bg-zinc-900/50 text-zinc-200 border-zinc-800/80 shadow-[0_0_15px_rgba(255,255,255,0.02)]"
                : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/20"
            }`}
          >
            <span className={isActive ? "text-zinc-400" : "text-zinc-600 font-bold"}>
              {item.index}
            </span> 
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

import Link from "next/link";
import NavigationLinks from "./NavigationLinks"; // Renders active client highlights cleanly

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#09090b] text-zinc-100 font-sans antialiased selection:bg-zinc-800">
      
      {/* Structural Minimalist Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-900 bg-[#09090b] p-6 hidden md:flex flex-col justify-between z-30">
        <div className="space-y-8">
          
          {/* Brand Anchor */}
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-5 rounded bg-zinc-100 text-black flex items-center justify-center font-black tracking-tighter text-[10px] border border-white">
              Δ
            </div>
            <span className="font-bold text-xs tracking-widest uppercase">CHURN.AI // CORE</span>
          </div>

          {/* Console Action Navigation (Delegated to handle highlights seamlessly) */}
          <NavigationLinks />
        </div>

        {/* System Settings Termination Node */}
        <div className="border-t border-zinc-900 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            &lt;-- EXIT_WORKSPACE
          </Link>
        </div>
      </aside>

      {/* Main Execution Viewport Wrapper */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-900/80 bg-[#09090b]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <span>CONSOLE</span> 
          </div>
          <div className="flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-widest text-emerald-500 bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/20">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            FASTAPI_PIPELINE_UP
          </div>
        </header>

        {/* Main Child View Injection Point */}
        <main className="p-6 max-w-7xl w-full mx-auto flex-1">{children}</main>
      </div>
    </div>
  );
}

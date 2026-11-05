import { Bell, Crosshair, LogOut, Moon, Radar, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  targetIp?: string;
  engine?: string;
}

export default function Header({
  targetIp = "192.168.1.1",
  engine = "Llama 3 (Ollama)",
}: HeaderProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const pageCode =
    location === "/"
      ? "OPS-01"
      : location === "/dashboard"
        ? "OPS-02"
        : location === "/kanban"
          ? "OPS-03"
          : location === "/config"
            ? "OPS-04"
            : "OPS-??";

  return (
    <header
      className="sticky top-0 z-30 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-y-2 relative"
      style={{
        backgroundColor: "var(--header-background)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Scan line overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.85 0.2 160 / 0.4), transparent)",
        }}
      />

      <div className="flex items-center gap-5">
        {/* REVEN Brand */}
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-9 overflow-hidden rounded-sm border border-border/50 bg-black">
            <img
              src="/reven-logo.png"
              alt=""
              className="h-9 w-9 object-cover object-top"
            />
          </div>
          <div>
            <h1
              className="text-[0.75rem] font-bold tracking-[0.2em] uppercase neon-green leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              REVEN
            </h1>
            <p
              className="text-[0.5rem] tracking-[0.15em] uppercase"
              style={{ color: "oklch(0.45 0.03 250)" }}
            >
              AI ORCHESTRATOR
            </p>
          </div>
        </div>

        <div className="h-6 w-px bg-border/50" />

        {/* Campaign Name */}
        <div className="flex items-center gap-2">
          <Crosshair size={13} className="text-[oklch(0.75_0.15_60)]" />
          <span
            className="text-[0.7rem] font-semibold tracking-wide text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            PROJECT OMEGA
          </span>
          <span className="text-[0.6rem] text-muted-foreground font-mono">
            HYBRID PTEST
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Target Info */}
        <div className="hidden xl:flex items-center gap-4 text-[0.65rem] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground uppercase tracking-wider">
              TGT:
            </span>
            <span className="text-foreground">{targetIp}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground uppercase tracking-wider">
              ENG:
            </span>
            <span className="text-foreground">{engine}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground uppercase tracking-wider">
              SEC:
            </span>
            <span className="text-[oklch(0.85_0.2_160)]">{pageCode}</span>
          </div>
        </div>

        <div className="h-6 w-px bg-border/50 hidden xl:block" />

        <button
          type="button"
          onClick={toggleTheme}
          className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground transition-colors"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("reven-demo-session");
            window.location.assign("/login");
          }}
          className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground transition-colors"
          aria-label="Exit demo session"
          title="Exit demo session"
        >
          <LogOut size={14} />
        </button>

        {/* Status */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1 rounded border"
          style={{
            borderColor: "oklch(0.85 0.2 160 / 0.3)",
            backgroundColor: "oklch(0.85 0.2 160 / 0.05)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: "oklch(0.85 0.2 160)" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: "oklch(0.85 0.2 160)" }}
            />
          </span>
          <span
            className="text-[0.6rem] font-bold tracking-wider"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "oklch(0.85 0.2 160)",
            }}
          >
            ACTIVE
          </span>
        </motion.div>

        <button className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground transition-colors relative">
          <Bell size={14} />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[oklch(0.65_0.25_25)] rounded-full" />
        </button>

        <button className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground transition-colors">
          <Radar size={14} />
        </button>
      </div>
    </header>
  );
}

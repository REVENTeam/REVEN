import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  BarChart3,
  KanbanSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Terminal,
} from "lucide-react";
import { useLocation } from "wouter";

const navItems = [
  {
    id: "chat",
    label: "Chat & Brainstream",
    icon: MessageCircle,
    path: "/",
    code: "OPS-01",
  },
  {
    id: "dashboard",
    label: "Campaign Dashboard",
    icon: BarChart3,
    path: "/dashboard",
    code: "OPS-02",
  },
  {
    id: "kanban",
    label: "Kanban Orchestrator",
    icon: KanbanSquare,
    path: "/kanban",
    code: "OPS-03",
  },
  {
    id: "config",
    label: "System Configuration",
    icon: Settings,
    path: "/config",
    code: "OPS-04",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const currentPath = location === "/" ? "/" : location;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 56 : 240 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
      style={{
        backgroundColor: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* Left accent line */}
      <div
        className="absolute top-0 left-0 w-[2px] h-full"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.85 0.2 160 / 0.6), transparent 30%, oklch(0.85 0.2 160 / 0.3) 70%, oklch(0.85 0.2 160 / 0.6))",
        }}
      />

      {/* Logo Area */}
      <div className="flex items-center justify-between p-3 border-b border-border/30 relative">
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.85 0.2 160 / 0.3), transparent)",
          }}
        />
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5"
            >
              <div className="h-6 w-9 shrink-0 overflow-hidden rounded-sm border border-border/50 bg-black">
                <img
                  src="/reven-logo.png"
                  alt=""
                  className="h-9 w-9 object-cover object-top"
                />
              </div>
              <div>
                <h1
                  className="text-[0.7rem] font-bold tracking-[0.15em] neon-green leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  REVEN
                </h1>
                <p className="text-[0.5rem] tracking-[0.1em] text-muted-foreground/60 uppercase">
                  AI Orchestrator v2.1
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="mx-auto h-6 w-9 overflow-hidden rounded-sm border border-border/50 bg-black">
            <img
              src="/reven-logo.png"
              alt="REVEN"
              className="h-9 w-9 object-cover object-top"
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-secondary/50 text-muted-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map(item => {
          const isActive = currentPath === item.path;
          return (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-sm transition-all duration-150 group relative ${
                isActive ? "bg-secondary/60" : "hover:bg-secondary/30"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full"
                  style={{ backgroundColor: "oklch(0.85 0.2 160)" }}
                />
              )}
              <item.icon
                size={15}
                className={`shrink-0 ${
                  isActive
                    ? "text-[oklch(0.85_0.2_160)]"
                    : "text-muted-foreground/60 group-hover:text-muted-foreground"
                }`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 min-w-0"
                  >
                    <span className="text-[0.7rem] font-medium text-foreground block truncate">
                      {item.label}
                    </span>
                    <span
                      className="text-[0.5rem] font-mono tracking-wider"
                      style={{
                        color: isActive
                          ? "oklch(0.85 0.2 160)"
                          : "oklch(0.35 0.02 250)",
                      }}
                    >
                      {item.code}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-2.5 border-t border-border/30 space-y-2 relative">
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.85 0.2 160 / 0.2), transparent)",
          }}
        />

        {/* Target Scope */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1.5"
            >
              <p className="text-[0.55rem] uppercase tracking-[0.1em] text-muted-foreground/50 font-mono">
                ── SCOPE PARAMETERS ──
              </p>
              <div className="bg-secondary/30 rounded-sm px-2 py-1.5 border border-border/20">
                <label className="text-[0.55rem] text-muted-foreground/60 font-mono uppercase tracking-wider">
                  Target IP
                </label>
                <input
                  type="text"
                  defaultValue="192.168.1.1"
                  className="w-full bg-transparent text-[0.7rem] text-foreground border-none outline-none font-mono mt-0.5"
                />
              </div>
              <div className="bg-secondary/30 rounded-sm px-2 py-1.5 border border-border/20">
                <label className="text-[0.55rem] text-muted-foreground/60 font-mono uppercase tracking-wider">
                  AI Engine
                </label>
                <select className="w-full bg-transparent text-[0.7rem] text-foreground border-none outline-none font-mono mt-0.5">
                  <option>Llama 3 (Ollama)</option>
                  <option>DeepSeek-Coder</option>
                  <option>Hybrid Mode</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Connection Status */}
        <div className="flex items-center gap-2 pt-1">
          <div className="relative">
            <Wifi size={11} className="text-[oklch(0.85_0.2_160)]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[oklch(0.85_0.2_160)] rounded-full pulse-neon" />
          </div>
          {!collapsed && (
            <div>
              <span
                className="text-[0.55rem] font-mono tracking-wider"
                style={{ color: "oklch(0.85 0.2 160)" }}
              >
                CONN: LIVE
              </span>
              <p className="text-[0.5rem] text-muted-foreground/50 font-mono">
                Kali VM 192.168.1.100
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

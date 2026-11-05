import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Cpu,
  Shield,
  Database,
  Network,
  Bell,
  Key,
  Monitor,
  ToggleLeft,
  ToggleRight,
  Zap,
  Eye,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface ConfigSection {
  id: string;
  label: string;
  code: string;
  icon: React.ElementType;
}

const configSections: ConfigSection[] = [
  { id: "llm", label: "LLM Engine", code: "CFG-01", icon: Cpu },
  { id: "security", label: "Security Rules", code: "CFG-02", icon: Shield },
  { id: "data", label: "Data Sources", code: "CFG-03", icon: Database },
  { id: "network", label: "Network Config", code: "CFG-04", icon: Network },
  { id: "notifications", label: "Notifications", code: "CFG-05", icon: Bell },
  { id: "api", label: "API Keys", code: "CFG-06", icon: Key },
  { id: "display", label: "Display", code: "CFG-07", icon: Monitor },
];

interface AgentConfig {
  name: string;
  model: string;
  status: "active" | "inactive" | "error";
  tokens: number;
  maxTokens: number;
}

const agents: AgentConfig[] = [
  { name: "Recon-Agent-01", model: "Llama 3 (8B)", status: "active", tokens: 45000, maxTokens: 128000 },
  { name: "Scan-Agent-03", model: "DeepSeek-Coder", status: "active", tokens: 32000, maxTokens: 128000 },
  { name: "Vuln-Agent-05", model: "Llama 3 (8B)", status: "active", tokens: 18000, maxTokens: 128000 },
  { name: "Exploit-Agent-08", model: "Hybrid Mode", status: "inactive", tokens: 0, maxTokens: 128000 },
  { name: "Gate-Agent-11", model: "Llama 3 (8B)", status: "active", tokens: 12000, maxTokens: 128000 },
];

function HUDPanel({ children, color = "oklch(0.85 0.2 160)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="cyber-card relative">
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: `${color} / 0.4` }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: `${color} / 0.4` }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: `${color} / 0.4` }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: `${color} / 0.4` }} />
      {children}
    </div>
  );
}

export default function SystemConfig() {
  const [activeSection, setActiveSection] = useState("llm");
  const [toggles, setToggles] = useState({
    autoApprove: false,
    notifications: true,
    darkTerminal: true,
    autoScan: true,
    gateMode: true,
    proxyChain: false,
  });

  const toggleSwitch = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="min-w-0 flex-1 ml-0 md:ml-[240px] transition-all duration-200">
        <Header />

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Config Navigation */}
            <div className="lg:col-span-3">
              <HUDPanel color="oklch(0.85 0.2 160)">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                  <Settings size={14} className="text-[oklch(0.85_0.2_160)]" />
                  <h3
                    className="text-[0.7rem] font-bold tracking-wider text-[oklch(0.85_0.2_160)]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    CONFIGURATION
                  </h3>
                </div>
                <div className="space-y-0.5">
                  {configSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-sm text-left transition-all ${
                        activeSection === section.id
                          ? "bg-secondary/60"
                          : "hover:bg-secondary/30"
                      }`}
                    >
                      <section.icon
                        size={14}
                        className={
                          activeSection === section.id
                            ? "text-[oklch(0.85_0.2_160)]"
                            : "text-muted-foreground/50"
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[0.65rem] font-medium text-foreground block">
                          {section.label}
                        </span>
                        <span
                          className="text-[0.45rem] font-mono tracking-wider"
                          style={{
                            color: activeSection === section.id ? "oklch(0.85 0.2 160)" : "oklch(0.3 0.02 250)",
                          }}
                        >
                          {section.code}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </HUDPanel>
            </div>

            {/* Config Content */}
            <div className="lg:col-span-9">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HUDPanel color="oklch(0.8 0.18 190)">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/30">
                    <Cpu size={14} className="text-[oklch(0.8_0.18_190)]" />
                    <h3
                      className="text-[0.7rem] font-bold tracking-wider text-[oklch(0.8_0.18_190)]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      LLM ENGINE CONFIGURATION
                    </h3>
                    <span className="ml-auto text-[0.5rem] font-mono text-muted-foreground/40">
                      {agents.filter((a) => a.status === "active").length}/{agents.length} ACTIVE
                    </span>
                  </div>

                  {/* Agent Cards */}
                  <div className="space-y-2">
                    {agents.map((agent, i) => (
                      <motion.div
                        key={agent.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-3 p-2.5 rounded-sm bg-secondary/20 border border-border/20"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-sm shrink-0"
                          style={{
                            backgroundColor:
                              agent.status === "active"
                                ? "oklch(0.85 0.2 160)"
                                : agent.status === "error"
                                ? "oklch(0.65 0.25 25)"
                                : "oklch(0.4 0.02 250)",
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[0.65rem] font-bold text-foreground font-mono truncate">
                            {agent.name}
                          </p>
                          <p className="text-[0.5rem] text-muted-foreground/50 font-mono">
                            {agent.model}
                          </p>
                        </div>
                        <div className="flex-1 max-w-[120px]">
                          <div className="flex justify-between text-[0.45rem] mb-0.5">
                            <span className="text-muted-foreground/50 font-mono">TOKENS</span>
                            <span className="text-muted-foreground/50 font-mono">
                              {Math.round((agent.tokens / agent.maxTokens) * 100)}%
                            </span>
                          </div>
                          <div className="h-1 bg-secondary/50 rounded-sm overflow-hidden">
                            <div
                              className="h-full rounded-sm transition-all duration-500"
                              style={{
                                width: `${(agent.tokens / agent.maxTokens) * 100}%`,
                                backgroundColor:
                                  agent.status === "active"
                                    ? "oklch(0.85 0.2 160)"
                                    : "oklch(0.4 0.02 250)",
                              }}
                            />
                          </div>
                        </div>
                        <span
                          className="text-[0.5rem] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm font-bold"
                          style={{
                            color:
                              agent.status === "active"
                                ? "oklch(0.85 0.2 160)"
                                : agent.status === "error"
                                ? "oklch(0.65 0.25 25)"
                                : "oklch(0.4 0.02 250)",
                            backgroundColor:
                              agent.status === "active"
                                ? "oklch(0.85 0.2 160 / 0.1)"
                                : agent.status === "error"
                                ? "oklch(0.65 0.25 25 / 0.1)"
                                : "oklch(0.4 0.02 250 / 0.1)",
                          }}
                        >
                          {agent.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Toggle Settings */}
                  <div className="border-t border-border/30 pt-3 mt-4">
                    <h4
                      className="text-[0.55rem] font-bold text-muted-foreground/50 mb-2.5 uppercase tracking-[0.1em]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      ── SYSTEM TOGGLES ──
                    </h4>
                    <div className="space-y-2">
                      {(
                        [
                          ["autoApprove", "Auto-Approve Low-Risk Commands"],
                          ["notifications", "Push Notifications"],
                          ["darkTerminal", "Dark Terminal Theme"],
                          ["autoScan", "Auto-Scan on Agent Start"],
                          ["gateMode", "Human-in-the-Loop Gate"],
                          ["proxyChain", "Proxy Chain Routing"],
                        ] as [keyof typeof toggles, string][]
                      ).map(([key, label]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between py-1.5 border-b border-border/10"
                        >
                          <span className="text-[0.65rem] text-foreground font-mono">
                            {label}
                          </span>
                          <button
                            onClick={() => toggleSwitch(key)}
                            className="transition-all"
                          >
                            {toggles[key] ? (
                              <ToggleRight
                                size={24}
                                className="text-[oklch(0.85_0.2_160)]"
                              />
                            ) : (
                              <ToggleLeft
                                size={24}
                                className="text-muted-foreground/30"
                              />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </HUDPanel>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

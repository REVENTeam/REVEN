import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Brain,
  ShieldAlert,
  Terminal,
  CheckCircle2,
  XCircle,
  Activity,
  Zap,
  Eye,
  Lock,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { toast } from "sonner";

const initialThoughts = [
  "[LOG] LLM Brain initialized. Awaiting strategy input...",
  "[SYSTEM] Neural pathways active. Context window: 128K tokens.",
  "[STRATEGY] Monitoring threat landscape in real-time...",
  "[SCAN] Passive recon mode engaged on 192.168.1.0/24",
  "[CACHE] Loading exploit database: 14,892 entries indexed.",
];

const initialTerminal = [
  "HA-agent:~$ system_init --status ready",
  "[+] Connected to Kali VM Environment (192.168.1.100)",
  "[+] Loading exploit modules... 47/47 loaded",
  "[+] Nmap 7.94 initialized and ready",
  "[+] Agent-01 (Recon) → Status: STANDBY",
  "[+] Agent-03 (Scan) → Status: STANDBY",
  "[+] Agent-05 (Vuln) → Status: STANDBY",
  "[+] Human Gate → AUTHORIZED",
];

const quickCommands = [
  "Scan open ports on target",
  "Analyze vulnerability surface",
  "Map network topology",
  "Run OS fingerprinting",
  "Check firewall rules",
];

export default function Home() {
  const [thoughtLogs, setThoughtLogs] = useState(initialThoughts);
  const [terminalLogs, setTerminalLogs] = useState(initialTerminal);
  const [userInput, setUserInput] = useState("");
  const [pendingApproval, setPendingApproval] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reconProgress, setReconProgress] = useState(75);
  const [vulnProgress, setVulnProgress] = useState(35);
  const thoughtEndRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    thoughtEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thoughtLogs]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const handleSend = () => {
    if (!userInput.trim()) return;
    setIsProcessing(true);

    const newThoughts = [
      `[THOUGHT] Analyzing request: '${userInput}'...`,
      `[PARSING] Intent classification: reconnaissance → active scan`,
      `[STRATEGY] Command selected: nmap -sS -A 192.168.1.1`,
      `[GATE] Awaiting human authorization for execution...`,
    ];
    setThoughtLogs((prev) => [...prev, ...newThoughts]);
    setPendingApproval("nmap -sS -A 192.168.1.1");
    setUserInput("");

    setTimeout(() => setIsProcessing(false), 800);
  };

  const handleApprove = () => {
    if (!pendingApproval) return;
    const newTerminal = [
      `HA-agent:~$ ${pendingApproval}`,
      "Starting Nmap 7.94 ( https://nmap.org ) at 2026-07-26 05:42 UTC",
      "Nmap scan report for 192.168.1.1",
      "Host is up (0.00040s latency).",
      "Not shown: 998 closed tcp ports (reset)",
      "PORT   STATE SERVICE VERSION",
      "22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5",
      "80/tcp open  http    Apache httpd 2.4.50 ((Unix))",
      "3306/tcp open  mysql  MySQL 5.7.34-0ubuntu0.18.04.1",
      "Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel",
      "",
      "Nmap done: 1 IP address (1 host up) scanned in 3.42 seconds",
      "[+] Agent-03 report: Scan complete. 3 services identified.",
    ];
    setTerminalLogs((prev) => [...prev, ...newTerminal]);
    setReconProgress(88);
    setVulnProgress(42);
    setThoughtLogs((prev) => [
      ...prev,
      "[RESULT] Port scan complete. 3 services identified.",
      "[ANALYSIS] Apache 2.4.50 → CVE-2021-41773 (PATH-TRAVERSAL) detected.",
      "[ANALYSIS] MySQL 5.7.34 → CVE-2022-21417 (DoS) flagged.",
      "[STATUS] Moving to vulnerability assessment phase...",
      "[ALERT] 2 potential CVEs queued for exploit evaluation.",
    ]);
    setPendingApproval(null);
    toast.success("Command executed — Scan results updated");
  };

  const handleReject = () => {
    setThoughtLogs((prev) => [
      ...prev,
      "[REJECTED] Human expert denied command execution.",
      "[GATE] Command discarded. Awaiting next directive.",
    ]);
    setPendingApproval(null);
    toast.error("Command rejected by operator");
  };

  const handleQuickCommand = (cmd: string) => {
    setUserInput(cmd);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="min-w-0 flex-1 ml-0 md:ml-[240px] transition-all duration-200">
        <Header />

        <div className="p-4">
          {/* Section Code Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[0.55rem] font-mono tracking-[0.15em] text-muted-foreground/50 uppercase">
                SECTOR
              </span>
              <span
                className="text-[0.6rem] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded-sm"
                style={{
                  color: "oklch(0.85 0.2 160)",
                  border: "1px solid oklch(0.85 0.2 160 / 0.3)",
                }}
              >
                OPS-01
              </span>
            </div>
            <div className="h-3 w-px bg-border/30" />
            <span className="text-[0.6rem] font-mono text-muted-foreground/50">
              CHAT & BRAINSTREAM // ACTIVE SESSION
            </span>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-3">
              {/* Human Expert Control */}
              <div className="cyber-card relative">
                {/* HUD corner marks */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "oklch(0.85 0.2 160 / 0.4)" }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "oklch(0.85 0.2 160 / 0.4)" }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "oklch(0.85 0.2 160 / 0.4)" }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "oklch(0.85 0.2 160 / 0.4)" }} />

                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                  <ShieldAlert size={14} className="text-[oklch(0.85_0.2_160)]" />
                  <h3
                    className="text-[0.75rem] font-bold tracking-wide text-[oklch(0.85_0.2_160)]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    HUMAN EXERT CONTROL
                  </h3>
                  <span className="ml-auto text-[0.5rem] font-mono text-muted-foreground/50">
                    INPUT_CHANNEL
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Enter directive or command for AI agent..."
                      className="w-full bg-secondary/30 border border-border/40 rounded-sm px-3 py-2 text-[0.75rem] text-foreground placeholder:text-muted-foreground/40 focus:border-[oklch(0.85_0.2_160)/0.5] focus:ring-0 outline-none transition-all font-mono"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.5rem] font-mono text-muted-foreground/30">
                      ENTER ↵
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSend}
                    disabled={!userInput.trim() || isProcessing}
                    className="w-full py-2 rounded-sm text-[0.7rem] font-bold tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-30"
                    style={{
                      backgroundColor: "oklch(0.85 0.2 160 / 0.12)",
                      border: "1px solid oklch(0.85 0.2 160 / 0.3)",
                      color: "oklch(0.85 0.2 160)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {isProcessing ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⚙
                      </motion.span>
                    ) : (
                      <Send size={12} />
                    )}
                    EXECUTE DIRECTIVE
                  </motion.button>

                  {/* Quick Commands */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {quickCommands.map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => handleQuickCommand(cmd)}
                        className="px-2 py-1 text-[0.55rem] rounded-sm bg-secondary/20 text-muted-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-all border border-border/20 font-mono"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Brain Thought Stream */}
              <div className="cyber-card relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />

                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                  <Brain size={14} className="text-[oklch(0.8_0.18_190)]" />
                  <h3
                    className="text-[0.75rem] font-bold tracking-wide text-[oklch(0.8_0.18_190)]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    AI BRAINSTREAM
                  </h3>
                  <span className="relative ml-auto flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "oklch(0.8 0.18 190)" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "oklch(0.8 0.18 190)" }} />
                  </span>
                </div>
                <div className="thought-stream">
                  <AnimatePresence>
                    {thoughtLogs.slice(-10).map((log, i) => (
                      <motion.div
                        key={`${log}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: i * 0.02 }}
                        className="mb-1"
                      >
                        <span
                          className={
                            log.includes("[THOUGHT]")
                              ? "text-[oklch(0.85_0.2_160)]"
                              : log.includes("[STRATEGY]")
                              ? "text-[oklch(0.8_0.18_190)]"
                              : log.includes("[RESULT]")
                              ? "text-[oklch(0.75_0.15_60)]"
                              : log.includes("[ALERT]")
                              ? "text-[oklch(0.65_0.25_25)]"
                              : log.includes("[REJECTED]")
                              ? "text-[oklch(0.65_0.25_25)]"
                              : log.includes("[GATE]")
                              ? "text-[oklch(0.75_0.15_60)]"
                              : log.includes("[CACHE]")
                              ? "text-[oklch(0.8_0.18_190)]"
                              : "text-muted-foreground/70"
                          }
                        >
                          {log}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={thoughtEndRef} />
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div className="lg:col-span-4 space-y-3">
              <AnimatePresence mode="wait">
                {pendingApproval ? (
                  <motion.div
                    key="gate"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="gate-alert relative">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "oklch(0.65 0.25 25 / 0.6)" }} />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "oklch(0.65 0.25 25 / 0.6)" }} />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "oklch(0.65 0.25 25 / 0.6)" }} />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "oklch(0.65 0.25 25 / 0.6)" }} />

                      <div className="flex items-center gap-2 mb-2">
                        <Lock size={16} className="text-[oklch(0.65_0.25_25)]" />
                        <h4
                          className="text-[0.75rem] font-bold tracking-wider"
                          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.65 0.25 25)" }}
                        >
                          GATE LOCK // AUTH REQUIRED
                        </h4>
                      </div>
                      <p className="text-[0.65rem] mb-3 opacity-70">
                        Agent requests authorization to execute the following command on Kali Linux:
                      </p>
                      <div
                        className="bg-black/40 rounded-sm px-3 py-2 mb-4 font-mono text-[0.75rem] border border-border/20"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.85 0.2 160)" }}
                      >
                        <span className="text-muted-foreground/50">$</span> {pendingApproval}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={handleApprove}
                          className="flex items-center justify-center gap-2 py-2 rounded-sm text-[0.65rem] font-bold tracking-wider transition-all hover:opacity-90"
                          style={{
                            backgroundColor: "oklch(0.85 0.2 160 / 0.15)",
                            border: "1px solid oklch(0.85 0.2 160 / 0.4)",
                            color: "oklch(0.85 0.2 160)",
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          <CheckCircle2 size={12} />
                          AUTHORIZE & EXEC
                        </button>
                        <button
                          onClick={handleReject}
                          className="flex items-center justify-center gap-2 py-2 rounded-sm text-[0.65rem] font-bold tracking-wider transition-all hover:opacity-90"
                          style={{
                            backgroundColor: "oklch(0.65 0.25 25 / 0.15)",
                            border: "1px solid oklch(0.65 0.25 25 / 0.4)",
                            color: "oklch(0.65 0.25 25)",
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          <XCircle size={12} />
                          DENY & DISCARD
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="tree"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-3"
                  >
                    {/* Decision Tree */}
                    <div className="cyber-card relative">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />

                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                        <Activity size={14} className="text-[oklch(0.8_0.18_190)]" />
                        <h3
                          className="text-[0.75rem] font-bold tracking-wide text-[oklch(0.8_0.18_190)]"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          DECISION TOPOLOGY
                        </h3>
                      </div>
                      <div className="rounded-sm overflow-hidden border border-border/20">
                        <svg
                          className="block w-full h-auto"
                          viewBox="0 0 640 320"
                          role="img"
                          aria-labelledby="network-topology-title network-topology-description"
                        >
                          <title id="network-topology-title">Network Topology</title>
                          <desc id="network-topology-description">
                            A network diagram connecting a gateway to six devices and services.
                          </desc>
                          <defs>
                            <pattern
                              id="network-grid"
                              width="24"
                              height="24"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M 24 0 L 0 0 0 24"
                                fill="none"
                                stroke="var(--border)"
                                strokeOpacity="0.35"
                                strokeWidth="0.7"
                              />
                            </pattern>
                          </defs>
                          <rect width="640" height="320" fill="var(--background)" />
                          <rect width="640" height="320" fill="url(#network-grid)" />

                          <g
                            fill="none"
                            stroke="var(--primary)"
                            strokeOpacity="0.48"
                            strokeWidth="2"
                          >
                            <path d="M320 76V120M320 170V220" />
                            <path d="M295 142 178 101M295 151 178 211" />
                            <path d="M345 142 462 101M345 151 462 211" />
                            <path d="M305 165 222 265M335 165 418 265" />
                          </g>

                          <g
                            fill="var(--card)"
                            stroke="var(--primary)"
                            strokeWidth="2"
                          >
                            <circle cx="320" cy="55" r="22" />
                            <circle cx="320" cy="145" r="27" />
                            <circle cx="155" cy="94" r="22" />
                            <circle cx="155" cy="218" r="22" />
                            <circle cx="485" cy="94" r="22" />
                            <circle cx="485" cy="218" r="22" />
                            <circle cx="205" cy="280" r="22" />
                            <circle cx="435" cy="280" r="22" />
                          </g>

                          <g
                            fill="none"
                            stroke="var(--primary)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path d="M310 58h20M313 52h14M316 46h8" />
                            <path d="M312 145h16M315 139h10M315 151h10" />
                            <path d="M149 90h12M149 96h12M151 102h8" />
                            <path d="M149 214h12M149 220h12M151 226h8" />
                            <path d="M479 90h12M479 96h12M481 102h8" />
                            <path d="M479 214h12M479 220h12M481 226h8" />
                            <path d="M199 276h12v9h-12zM202 273v-3h6v3" />
                            <path d="M429 276h12v9h-12zM432 273v-3h6v3" />
                          </g>

                          <g
                            fill="var(--foreground)"
                            fontFamily="var(--font-mono)"
                            fontSize="11"
                            textAnchor="middle"
                          >
                            <text x="320" y="25">INTERNET</text>
                            <text x="320" y="190">GATEWAY · 192.168.1.1</text>
                            <text x="155" y="130">WORKSTATION</text>
                            <text x="155" y="254">OPERATOR</text>
                            <text x="485" y="130">DATABASE</text>
                            <text x="485" y="254">API NODE</text>
                            <text x="205" y="313">CLIENT</text>
                            <text x="435" y="313">SERVICES</text>
                          </g>

                          <circle cx="320" cy="145" r="4" fill="var(--primary)">
                            <animate
                              attributeName="opacity"
                              values="1;0.35;1"
                              dur="2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </svg>
                      </div>
                    </div>

                    {/* Progress Telemetry */}
                    <div className="cyber-card relative">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "oklch(0.85 0.2 160 / 0.3)" }} />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "oklch(0.85 0.2 160 / 0.3)" }} />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "oklch(0.85 0.2 160 / 0.3)" }} />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "oklch(0.85 0.2 160 / 0.3)" }} />

                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                        <Zap size={14} className="text-[oklch(0.85_0.2_160)]" />
                        <h3
                          className="text-[0.75rem] font-bold tracking-wide text-[oklch(0.85_0.2_160)]"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          OPERATIONAL TELEMETRY
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { label: "RECON COVERAGE", value: reconProgress, color: "oklch(0.85 0.2 160)" },
                          { label: "VULN EXPLOITATION RISK", value: vulnProgress, color: "oklch(0.75 0.15 60)" },
                          { label: "EXPLOIT CHAIN READINESS", value: 28, color: "oklch(0.8 0.18 190)" },
                          { label: "NETWORK MAP COMPLETION", value: 92, color: "oklch(0.8 0.18 190)" },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="flex justify-between text-[0.6rem] mb-1">
                              <span
                                className="font-mono tracking-wider text-muted-foreground/70"
                              >
                                {item.label}
                              </span>
                              <span className="font-mono font-bold" style={{ color: item.color }}>
                                {item.value}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-3">
              {/* Terminal */}
              <div className="cyber-card relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "oklch(0.85 0.2 160 / 0.5)" }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "oklch(0.85 0.2 160 / 0.5)" }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "oklch(0.85 0.2 160 / 0.5)" }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "oklch(0.85 0.2 160 / 0.5)" }} />

                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                  <Terminal size={14} className="text-[oklch(0.85_0.2_160)]" />
                  <h3
                    className="text-[0.75rem] font-bold tracking-wide text-[oklch(0.85_0.2_160)]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    AGENT EXECUTION
                  </h3>
                  <span className="ml-auto text-[0.5rem] text-muted-foreground/40 font-mono tracking-wider">
                    KALI LINUX v2024.1
                  </span>
                </div>
                <div className="terminal-window">
                  <AnimatePresence>
                    {terminalLogs.map((log, i) => (
                      <motion.div
                        key={`term-${i}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.12 }}
                        className={
                          log.startsWith("HA-agent")
                            ? "text-[oklch(0.85_0.2_160)] font-bold"
                            : log.startsWith("[+]")
                            ? "text-[oklch(0.7_0.1_60)]"
                            : "text-muted-foreground/80"
                        }
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <motion.div
                    className="inline-block w-2 h-3.5 bg-[oklch(0.85_0.2_160)]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  <div ref={terminalEndRef} />
                </div>
              </div>

              {/* Mini Kanban */}
              <div className="cyber-card relative">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: "oklch(0.8 0.18 190 / 0.4)" }} />

                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                  <KanbanSquare size={14} className="text-[oklch(0.8_0.18_190)]" />
                  <h3
                    className="text-[0.75rem] font-bold tracking-wide text-[oklch(0.8_0.18_190)]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    TASK QUEUE
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "ACTIVE", color: "oklch(0.85 0.2 160)", tasks: ["Port Scanning", "Service Detection"] },
                    { label: "BLOCKED", color: "oklch(0.65 0.25 25)", tasks: ["Human Approval"] },
                    { label: "COMPLETE", color: "oklch(0.8 0.18 190)", tasks: ["Net Topology", "Scope Setup"] },
                  ].map((col) => (
                    <div key={col.label}>
                      <p
                        className="text-[0.5rem] uppercase tracking-[0.1em] font-bold mb-2 font-mono"
                        style={{ color: col.color }}
                      >
                        ── {col.label} ──
                      </p>
                      {col.tasks.map((task, i) => (
                        <motion.div
                          key={task}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="kanban-item text-[0.65rem]"
                          style={{
                            borderLeftColor: col.color,
                            borderColor: col.color,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {task}
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanSquare(props: { size?: number; className?: string }) {
  const { size = 14, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 7v7" />
      <path d="M12 7v4" />
      <path d="M16 7v9" />
    </svg>
  );
}

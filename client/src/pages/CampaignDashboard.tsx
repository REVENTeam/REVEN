import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Target,
  AlertTriangle,
  Shield,
  Clock,
  Activity,
  Eye,
  Crosshair,
  Radar,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const activityData = [
  { time: "00:00", scans: 12, exploits: 2, alerts: 5 },
  { time: "02:00", scans: 18, exploits: 3, alerts: 8 },
  { time: "04:00", scans: 25, exploits: 5, alerts: 12 },
  { time: "06:00", scans: 30, exploits: 7, alerts: 10 },
  { time: "08:00", scans: 45, exploits: 8, alerts: 15 },
  { time: "10:00", scans: 52, exploits: 12, alerts: 18 },
  { time: "12:00", scans: 38, exploits: 9, alerts: 14 },
  { time: "14:00", scans: 42, exploits: 11, alerts: 16 },
  { time: "16:00", scans: 55, exploits: 14, alerts: 20 },
  { time: "18:00", scans: 48, exploits: 10, alerts: 17 },
  { time: "20:00", scans: 35, exploits: 6, alerts: 9 },
  { time: "22:00", scans: 20, exploits: 3, alerts: 6 },
];

const vulnerabilityData = [
  { name: "CRITICAL", value: 3, color: "#FF3333" },
  { name: "HIGH", value: 7, color: "#FFB020" },
  { name: "MEDIUM", value: 12, color: "#00E5FF" },
  { name: "LOW", value: 18, color: "#00FF9D" },
  { name: "INFO", value: 25, color: "#8A99AD" },
];

const portData = [
  { port: "22", service: "SSH", version: "OpenSSH 8.2p1", status: "open", risk: "medium" },
  { port: "80", service: "HTTP", version: "Apache 2.4.50", status: "open", risk: "high" },
  { port: "443", service: "HTTPS", version: "Nginx 1.18", status: "open", risk: "low" },
  { port: "3306", service: "MySQL", version: "5.7.34", status: "open", risk: "critical" },
  { port: "8080", service: "HTTP-Alt", version: "Tomcat 9.0", status: "open", risk: "medium" },
  { port: "6379", service: "Redis", version: "6.0.16", status: "open", risk: "high" },
];

const stats = [
  {
    label: "TOTAL SCANS",
    value: "347",
    icon: Target,
    color: "oklch(0.85 0.2 160)",
    change: "+12%",
  },
  {
    label: "VULNERABILITIES",
    value: "65",
    icon: AlertTriangle,
    color: "oklch(0.65 0.25 25)",
    change: "+3",
  },
  {
    label: "EXPLOITS FOUND",
    value: "8",
    icon: Shield,
    color: "oklch(0.75 0.15 60)",
    change: "+2",
  },
  {
    label: "CAMPAIGN TIME",
    value: "4h 23m",
    icon: Clock,
    color: "oklch(0.8 0.18 190)",
    change: "ACTIVE",
  },
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

export default function CampaignDashboard() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="min-w-0 flex-1 ml-0 md:ml-[240px] transition-all duration-200">
        <Header />

        <div className="p-4 space-y-4">
          {/* Section Code */}
          <div className="flex items-center gap-3">
            <span className="text-[0.55rem] font-mono tracking-[0.15em] text-muted-foreground/50 uppercase">SECTOR</span>
            <span
              className="text-[0.6rem] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded-sm"
              style={{ color: "oklch(0.85 0.2 160)", border: "1px solid oklch(0.85 0.2 160 / 0.3)" }}
            >
              OPS-02
            </span>
            <div className="h-3 w-px bg-border/30" />
            <span className="text-[0.6rem] font-mono text-muted-foreground/50">
              CAMPAIGN DASHBOARD // REAL-TIME TELEMETRY
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="cyber-card relative"
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: `${stat.color}40` }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: `${stat.color}40` }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: `${stat.color}40` }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: `${stat.color}40` }} />

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center"
                    style={{
                      backgroundColor: `${stat.color}10`,
                      border: `1px solid ${stat.color}25`,
                    }}
                  >
                    <stat.icon size={16} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-[0.55rem] text-muted-foreground/60 uppercase tracking-[0.1em] font-mono">
                      {stat.label}
                    </p>
                    <p
                      className="text-xl font-bold font-mono leading-tight"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[0.55rem] font-mono mt-0.5" style={{ color: stat.color }}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Activity Chart */}
            <HUDPanel color="oklch(0.85 0.2 160)">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                <Activity size={14} className="text-[oklch(0.85_0.2_160)]" />
                <h3
                  className="text-[0.7rem] font-bold tracking-wider text-[oklch(0.85_0.2_160)]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  ACTIVITY TELEMETRY (24H)
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250)" />
                  <XAxis
                    dataKey="time"
                    stroke="oklch(0.35 0.02 250)"
                    fontSize={9}
                    tick={{ fill: "oklch(0.45 0.02 250)", fontFamily: "'JetBrains Mono'" }}
                  />
                  <YAxis
                    stroke="oklch(0.35 0.02 250)"
                    fontSize={9}
                    tick={{ fill: "oklch(0.45 0.02 250)", fontFamily: "'JetBrains Mono'" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0.02 250)",
                      border: "1px solid oklch(0.85 0.2 160 / 0.3)",
                      borderRadius: "0.25rem",
                      fontSize: "0.7rem",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="scans"
                    stroke="oklch(0.85 0.2 160)"
                    fill="oklch(0.85 0.2 160 / 0.08)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="exploits"
                    stroke="oklch(0.75 0.15 60)"
                    fill="oklch(0.75 0.15 60 / 0.08)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="alerts"
                    stroke="oklch(0.65 0.25 25)"
                    fill="oklch(0.65 0.25 25 / 0.08)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex gap-4 mt-2 pt-2 border-t border-border/20">
                {[
                  { label: "SCANS", color: "oklch(0.85 0.2 160)" },
                  { label: "EXPLOITS", color: "oklch(0.75 0.15 60)" },
                  { label: "ALERTS", color: "oklch(0.65 0.25 25)" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-2 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-[0.5rem] font-mono tracking-wider text-muted-foreground/60">{l.label}</span>
                  </div>
                ))}
              </div>
            </HUDPanel>

            {/* Vulnerability Distribution */}
            <HUDPanel color="oklch(0.75 0.15 60)">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                <AlertTriangle size={14} className="text-[oklch(0.75_0.15_60)]" />
                <h3
                  className="text-[0.7rem] font-bold tracking-wider text-[oklch(0.75_0.15_60)]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  THREAT DISTRIBUTION
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={vulnerabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {vulnerabilityData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.14 0.02 250)",
                      border: "1px solid oklch(0.25 0.02 250)",
                      borderRadius: "0.25rem",
                      fontSize: "0.7rem",
                      fontFamily: "'JetBrains Mono'",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-2">
                {vulnerabilityData.map((v) => (
                  <div key={v.name} className="flex items-center justify-between text-[0.6rem]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: v.color }} />
                      <span className="font-mono text-muted-foreground/70">{v.name}</span>
                    </div>
                    <span className="font-mono font-bold" style={{ color: v.color }}>{v.value}</span>
                  </div>
                ))}
              </div>
            </HUDPanel>
          </div>

          {/* Port Scan Results */}
          <HUDPanel color="oklch(0.8 0.18 190)">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
              <Crosshair size={14} className="text-[oklch(0.8_0.18_190)]" />
              <h3
                className="text-[0.7rem] font-bold tracking-wider text-[oklch(0.8_0.18_190)]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                PORT SCAN RESULTS // 192.168.1.1
              </h3>
              <span className="ml-auto text-[0.5rem] font-mono text-muted-foreground/40">
                6 PORTS DISCOVERED
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.7rem]">
                <thead>
                  <tr className="border-b border-border/30">
                    {["PORT", "SERVICE", "VERSION", "STATUS", "RISK"].map((h) => (
                      <th key={h} className="text-left py-2 px-3 text-[0.5rem] uppercase tracking-[0.1em] text-muted-foreground/50 font-mono">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {portData.map((row, i) => (
                    <motion.tr
                      key={row.port}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/15 hover:bg-secondary/20 transition-colors"
                    >
                      <td className="py-2 px-3 font-mono text-xs" style={{ color: "oklch(0.85 0.2 160)" }}>
                        {row.port}
                      </td>
                      <td className="py-2 px-3 text-xs text-foreground">{row.service}</td>
                      <td className="py-2 px-3 text-xs text-muted-foreground font-mono">{row.version}</td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[0.55rem] bg-[oklch(0.85_0.2_160)/0.1] text-[oklch(0.85_0.2_160)] font-mono">
                          <span className="w-1 h-1 rounded-full bg-[oklch(0.85_0.2_160)] pulse-neon" />
                          OPEN
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[0.55rem] font-mono uppercase tracking-wider"
                          style={{
                            color: row.risk === "critical" ? "oklch(0.65 0.25 25)" : row.risk === "high" ? "oklch(0.75 0.15 60)" : row.risk === "medium" ? "oklch(0.8 0.18 190)" : "oklch(0.85 0.2 160)",
                            backgroundColor: row.risk === "critical" ? "oklch(0.65 0.25 25 / 0.12)" : row.risk === "high" ? "oklch(0.75 0.15 60 / 0.12)" : row.risk === "medium" ? "oklch(0.8 0.18 190 / 0.12)" : "oklch(0.85 0.2 160 / 0.12)",
                          }}
                        >
                          {row.risk}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </HUDPanel>
        </div>
      </div>
    </div>
  );
}

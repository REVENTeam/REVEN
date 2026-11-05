import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, GripVertical, Clock, AlertCircle, CheckCircle2, Pause } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface KanbanTask {
  id: string;
  title: string;
  status: "backlog" | "todo" | "progress" | "review" | "done";
  priority: "critical" | "high" | "medium" | "low";
  agent: string;
  time?: string;
}

const initialTasks: KanbanTask[] = [
  { id: "1", title: "Network Topology Mapping", status: "done", priority: "high", agent: "Recon-Agent-01", time: "12m ago" },
  { id: "2", title: "Target Scope Setup", status: "done", priority: "medium", agent: "Scope-Agent-02", time: "28m ago" },
  { id: "3", title: "Port Scanning (Nmap)", status: "progress", priority: "high", agent: "Scan-Agent-03", time: "3m ago" },
  { id: "4", title: "Service Version Detection", status: "progress", priority: "medium", agent: "Scan-Agent-03", time: "5m ago" },
  { id: "5", title: "OS Fingerprinting", status: "progress", priority: "low", agent: "Fingerprint-Agent-04", time: "7m ago" },
  { id: "6", title: "CVE Database Lookup", status: "todo", priority: "high", agent: "Vuln-Agent-05", time: "-" },
  { id: "7", title: "Firewall Rule Analysis", status: "todo", priority: "medium", agent: "Net-Agent-06", time: "-" },
  { id: "8", title: "SSL/TLS Configuration Audit", status: "todo", priority: "low", agent: "Crypto-Agent-07", time: "-" },
  { id: "9", title: "Exploit Chain Construction", status: "backlog", priority: "critical", agent: "Exploit-Agent-08", time: "-" },
  { id: "10", title: "Payload Generation", status: "backlog", priority: "critical", agent: "Payload-Agent-09", time: "-" },
  { id: "11", title: "Access Persistence Setup", status: "backlog", priority: "high", agent: "Persist-Agent-10", time: "-" },
  { id: "12", title: "Awaiting Human Approval", status: "review", priority: "high", agent: "Gate-Agent-11", time: "1m ago" },
];

const columns = [
  { id: "backlog", label: "BACKLOG", code: "Q-01", color: "#8A99AD" },
  { id: "todo", label: "TODO", code: "Q-02", color: "#00E5FF" },
  { id: "progress", label: "ACTIVE", code: "Q-03", color: "#00FF9D" },
  { id: "review", label: "GATE LOCK", code: "Q-04", color: "#FFB020" },
  { id: "done", label: "COMPLETE", code: "Q-05", color: "#00FF9D" },
];

const priorityColors: Record<string, string> = {
  critical: "#FF3333",
  high: "#FFB020",
  medium: "#00E5FF",
  low: "#8A99AD",
};

export default function KanbanOrchestrator() {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDrop = (status: KanbanTask["status"]) => {
    if (!draggedTask) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTask ? { ...t, status } : t))
    );
    setDraggedTask(null);
  };

  const getTasksByStatus = (status: KanbanTask["status"]) =>
    tasks.filter((t) => t.status === status);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="min-w-0 flex-1 ml-0 md:ml-[240px] transition-all duration-200">
        <Header />

        <div className="p-4">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-[0.55rem] font-mono tracking-[0.15em] text-muted-foreground/50 uppercase">SECTOR</span>
              <span
                className="text-[0.6rem] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded-sm"
                style={{ color: "oklch(0.85 0.2 160)", border: "1px solid oklch(0.85 0.2 160 / 0.3)" }}
              >
                OPS-03
              </span>
              <div className="h-3 w-px bg-border/30" />
              <span className="text-[0.6rem] font-mono text-muted-foreground/50">
                TASK ORCHESTRATION // DRAG TO REASSIGN
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-sm text-[0.55rem] bg-secondary/50 text-muted-foreground font-mono tracking-wider">
                {tasks.length} TASKS
              </span>
            </div>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2.5">
            {columns.map((col, colIdx) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: colIdx * 0.04 }}
                className="flex flex-col"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(col.id as KanbanTask["status"])}
              >
                {/* Column Header */}
                <div
                  className="flex items-center justify-between px-2.5 py-2 rounded-t-sm border-b-2 mb-1.5"
                  style={{
                    backgroundColor: "oklch(0.14 0.02 250)",
                    borderBottomColor: col.color,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: col.color }} />
                    <span
                      className="text-[0.6rem] font-bold tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: col.color }}
                    >
                      {col.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[0.5rem] font-mono text-muted-foreground/40">{col.code}</span>
                    <span
                      className="text-[0.5rem] font-mono font-bold px-1 rounded-sm"
                      style={{
                        color: col.color,
                        backgroundColor: `${col.color}15`,
                      }}
                    >
                      {getTasksByStatus(col.id as KanbanTask["status"]).length}
                    </span>
                  </div>
                </div>

                {/* Column Body */}
                <div
                  className="flex-1 rounded-b-sm p-1.5 space-y-1.5 min-h-[320px]"
                  style={{ backgroundColor: "oklch(0.11 0.02 250)" }}
                >
                  <AnimatePresence mode="popLayout">
                    {getTasksByStatus(col.id as KanbanTask["status"]).map(
                      (task, taskIdx) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            delay: taskIdx * 0.03,
                            duration: 0.15,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          draggable
                          onDragStart={() => handleDragStart(task.id)}
                          className="group relative p-2.5 rounded-sm cursor-grab active:cursor-grabbing transition-all hover:bg-secondary/40"
                          style={{
                            backgroundColor: "oklch(0.16 0.02 250)",
                            borderLeft: `2px solid ${priorityColors[task.priority]}`,
                          }}
                        >
                          <div className="flex items-start gap-1.5">
                            <GripVertical
                              size={10}
                              className="shrink-0 text-muted-foreground/30 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[0.65rem] font-medium text-foreground truncate">
                                {task.title}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-[0.5rem] text-muted-foreground/50 font-mono truncate">
                                  {task.agent}
                                </span>
                                {task.time && task.time !== "-" && (
                                  <span className="text-[0.45rem] text-muted-foreground/30 font-mono">
                                    {task.time}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 mt-1">
                                <div
                                  className="w-1 h-1 rounded-sm"
                                  style={{ backgroundColor: priorityColors[task.priority] }}
                                />
                                <span
                                  className="text-[0.45rem] font-mono uppercase tracking-wider font-bold"
                                  style={{ color: priorityColors[task.priority] }}
                                >
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>

                  <button className="w-full py-1.5 rounded-sm text-[0.5rem] text-muted-foreground/40 hover:text-muted-foreground hover:bg-secondary/20 transition-all flex items-center justify-center gap-1 font-mono">
                    <Plus size={8} />
                    ADD
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

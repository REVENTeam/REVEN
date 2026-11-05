import { type FormEvent, useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px), radial-gradient(ellipse at 20% 20%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 55%)",
          backgroundSize: "48px 48px, 48px 48px, 100% 100%",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="absolute right-5 top-5 z-10 rounded-md border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
        <section className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative mb-7 aspect-square w-48 overflow-hidden rounded-2xl border border-border/60 bg-black shadow-2xl shadow-primary/10 sm:w-56">
            <img
              src="/reven-logo.png"
              alt="REVEN eagle emblem"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 flex h-[32%] items-center justify-center bg-black">
              <span className="font-display text-2xl font-bold tracking-[0.3em] text-white">
                REVEN
              </span>
            </div>
          </div>
          <span className="mb-3 font-mono text-xs tracking-[0.3em] text-primary">
            REVEN // OPERATIONS PLATFORM
          </span>
          <h1 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Clarity for every operation.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Bring your workspace together in one focused command center.
          </p>
          <div className="mt-7 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-[0.65rem] tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            LOCAL DEMO
          </div>
        </section>

        <section className="cyber-card w-full p-6 sm:p-8">
          <div className="mb-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
              <LockKeyhole size={18} />
            </div>
            <p className="font-mono text-[0.65rem] tracking-[0.22em] text-muted-foreground">
              DEMO WORKSPACE
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Sign in to REVEN
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your details to preview the workspace.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="reven-email"
                className="text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <input
                id="reven-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="reven-password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="reven-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter any password for this preview"
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(visible => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Continue to demo
              <ArrowRight size={16} />
            </button>
          </form>

          <p
            role="note"
            className="mt-5 rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 text-xs leading-5 text-muted-foreground"
          >
            Demo preview only. No account is verified and no credentials are
            saved or sent. This screen does not provide real authentication.
          </p>
        </section>
      </div>
    </main>
  );
}

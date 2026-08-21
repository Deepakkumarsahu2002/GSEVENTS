import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "sonner";

import { API_BASE } from "@/lib/api";

export function StudioLogin() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.token) {
        throw new Error(payload.error || "Invalid login credentials");
      }

      sessionStorage.setItem("studio_session", email);
      sessionStorage.setItem("studio_token", payload.token);
      toast.success("Signed in");
      navigate("/atelier-suite-9x4f/dashboard");
    } catch (error) {
      // If the backend isn't running during local development, allow a dev fallback
      if (import.meta.env.DEV && error instanceof TypeError) {
        // Network error (e.g. backend offline) — create a safe dev session so the studio can still be used locally
        const devToken = "dev-token";
        sessionStorage.setItem("studio_session", email);
        sessionStorage.setItem("studio_token", devToken);
        toast.success("Signed in (dev fallback - backend offline)");
        navigate("/atelier-suite-9x4f/dashboard");
      } else {
        toast.error(error instanceof Error ? error.message : "Login failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "mt-2 w-full border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <div className="flex min-h-screen items-center justify-center bg-espresso px-5 py-16">
      <div className="w-full max-w-sm border border-primary/25 bg-card p-9 shadow-lift">
        <div className="grid size-11 place-items-center rounded-full border border-primary/40 text-primary">
          <Lock className="size-4" />
        </div>
        <h1 className="mt-6 font-serif text-2xl tracking-wide">Admin Access</h1>
        <p className="mt-2 text-sm text-muted-foreground">Authorised personnel only.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="eyebrow block" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required className={field} />
          </div>
          <div>
            <label className="eyebrow block" htmlFor="password">
              Password
            </label>
            <input id="password" name="password" type="password" required className={field} />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-secondary px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-secondary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

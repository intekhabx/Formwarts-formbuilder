"use client"

// ─────────────────────────────────────────────────────────────
//  LoginForm.tsx  —  Formwarts · Hogwarts Theme
//  Logic: unchanged (react-hook-form + tRPC useLogin hook)
//  Only styling has been replaced with Hogwarts aesthetic
//
//  Fonts required in layout.tsx / globals.css:
//  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&display=swap');
//
//  Tailwind config — extend fontFamily:
//  cinzel: ['Cinzel', 'serif'],
//  fell:   ['IM Fell English', 'serif'],
// ─────────────────────────────────────────────────────────────

import { cn } from "~/lib/utils"
import { useForm } from "react-hook-form"
import { useLogin } from "~/hooks/api/auth"

interface FormData {
  email: string
  password: string
}

// ── Inline CSS for Hogwarts-specific styles not coverable by Tailwind alone
const styles = `
  @keyframes fw-fadeup {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fw-shimmer {
    from { transform: translateX(-100%) skewX(-12deg); }
    to   { transform: translateX(220%) skewX(-12deg); }
  }
  @keyframes fw-twinkle {
    0%,100% { opacity: 0.08; transform: scale(1); }
    50%     { opacity: 0.6;  transform: scale(1.5); }
  }
  .fw-star {
    position: absolute; border-radius: 50%;
    background: #c9a84c;
    animation: fw-twinkle var(--dur,3s) ease-in-out infinite var(--delay,0s);
  }
  .fw-card-fadeup { animation: fw-fadeup 0.65s ease both; }
  .fw-card-fadeup-1 { animation: fw-fadeup 0.65s ease 0.08s both; }
  .fw-card-fadeup-2 { animation: fw-fadeup 0.65s ease 0.16s both; }
  .fw-card-fadeup-3 { animation: fw-fadeup 0.65s ease 0.24s both; }
  .fw-card-fadeup-4 { animation: fw-fadeup 0.65s ease 0.32s both; }
  .fw-input {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(201,168,76,0.22);
    color: #e8d5a3;
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 15px;
    padding: 7px 0 7px 0;
    outline: none;
    transition: border-color 0.25s;
    caret-color: #c9a84c;
  }
  .fw-input::placeholder { color: rgba(201,168,76,0.22); }
  .fw-input:focus { border-color: #c9a84c; }
  .fw-input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px #110c02 inset;
    -webkit-text-fill-color: #e8d5a3;
  }
  .fw-btn-primary {
    position: relative; overflow: hidden;
    width: 100%; padding: 11px 0;
    background: #c9a84c;
    color: #0a0600;
    font-family: 'Cinzel', serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase;
    border: none; border-radius: 1px; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .fw-btn-primary:hover {
    background: #dbb95a;
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(201,168,76,0.22);
  }
  .fw-btn-primary:hover::after {
    content:'';
    position:absolute;inset:0;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
    animation: fw-shimmer 0.55s ease;
  }
  .fw-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  .fw-btn-outline {
    width: 100%; padding: 10px 0;
    background: transparent;
    border: 1px solid rgba(201,168,76,0.22);
    color: #7a5a28;
    font-family: 'Cinzel', serif;
    font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase;
    border-radius: 1px; cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .fw-btn-outline:hover { border-color: rgba(201,168,76,0.5); color: #c9a84c; background: rgba(201,168,76,0.04); }
  .fw-error { font-family: 'IM Fell English', serif; font-style: italic; font-size: 12px; color: #c94040; margin-top: 5px; }
  .fw-link { color: #c9a84c; text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s; font-style: italic; }
  .fw-link:hover { color: #e8d5a3; }
  .fw-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  }
`

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {

  // ── Existing logic — untouched ──
  const { loginUserWithEmailAndPasswordAsync } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  })

  const onsubmit = async (data: FormData) => {
    const { id } = await loginUserWithEmailAndPasswordAsync({
      email: data.email,
      password: data.password,
    })
    console.log(id)
  }
  // ── End existing logic ──

  return (
    <>
      {/* Inject Hogwarts styles */}
      <style>{styles}</style>

      {/* Full-page wrapper */}
      <div
        className={cn("relative min-h-screen w-full flex items-center justify-center overflow-hidden", className)}
        style={{ background: "linear-gradient(135deg,#0a0600 0%,#110c02 55%,#0d0800 100%)", fontFamily: "'IM Fell English',serif" }}
        {...props}
      >
        {/* Noise overlay */}
        <div className="fw-noise fixed inset-0 pointer-events-none opacity-30 z-0" />

        {/* Radial glow */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse 650px 550px at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)" }}
        />

        {/* Stars — generated via CSS + inline vars */}
        {Array.from({ length: 55 }).map((_, i) => (
          <span
            key={i}
            className="fw-star fixed pointer-events-none z-0"
            style={{
              width:  `${Math.random() * 1.8 + 0.8}px`,
              height: `${Math.random() * 1.8 + 0.8}px`,
              top:    `${Math.random() * 100}%`,
              left:   `${Math.random() * 100}%`,
              opacity: Math.random() * 0.45 + 0.08,
              ["--dur" as string]:   `${2 + Math.random() * 4}s`,
              ["--delay" as string]: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* ── Card ── */}
        <div className="relative z-10 w-full max-w-sm mx-4 fw-card-fadeup">

          {/* Top gold accent line */}
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)" }} />

          <div
            className="px-9 py-10"
            style={{
              background: "linear-gradient(160deg, rgba(28,20,0,0.97) 0%, rgba(14,10,2,0.99) 100%)",
              border: "1px solid rgba(201,168,76,0.12)",
              boxShadow: "0 0 70px rgba(201,168,76,0.07), 0 0 0 0.5px rgba(201,168,76,0.08)",
            }}
          >
            {/* ── Header ── */}
            <div className="text-center mb-8 fw-card-fadeup-1">
              {/* Crest */}
              <div
                className="w-13 h-13 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  width: 52, height: 52,
                  border: "1px solid rgba(201,168,76,0.45)",
                  background: "rgba(201,168,76,0.06)",
                }}
              >
                <span style={{ fontFamily: "'Cinzel',serif", fontWeight: 600, fontSize: 20, color: "#c9a84c" }}>F</span>
              </div>

              {/* Brand */}
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 6 }}>
                Formwarts
              </p>

              <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 600, color: "#e8d5a3", lineHeight: 1.2, marginBottom: 4 }}>
                Welcome back,
              </h1>
              <p style={{ fontStyle: "italic", fontSize: 15, color: "#7a5a28" }}>
                The Great Hall awaits your return.
              </p>
            </div>

            {/* ── Gold divider ── */}
            <div className="fw-card-fadeup-1" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.28),transparent)" }} />
              <span style={{ fontFamily: "'Cinzel',serif", color: "#4a3010", fontSize: 11 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.28),transparent)" }} />
            </div>

            {/* ── Demo credentials hint ── */}
            <div
              className="fw-card-fadeup-1"
              style={{
                border: "1px solid rgba(201,168,76,0.13)",
                background: "rgba(201,168,76,0.035)",
                padding: "10px 14px",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a3010" }}>
                Demo Credentials
              </p>
              <p style={{ fontStyle: "italic", fontSize: 13, color: "#c9a84c", marginTop: 3 }}>
                demo@formwarts.dev · expelliarmus
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit(onsubmit)} className="fw-card-fadeup-2" style={{ display: "flex", flexDirection: "column", gap: 0 }}>

              {/* Email */}
              <div style={{ marginBottom: 22 }}>
                <label
                  htmlFor="email"
                  style={{ display: "block", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a5a28", marginBottom: 8 }}
                >
                  Owl Post Address <span style={{ color: "#c94040" }}>*</span>
                </label>
                <input
                  {...register("email", {
                    required: "email is required",
                    maxLength: { value: 322, message: "email should be less than 322 characters" },
                  })}
                  id="email"
                  type="email"
                  placeholder="harry@hogwarts.edu"
                  className="fw-input"
                />
                {errors.email && <p className="fw-error">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <label
                    htmlFor="password"
                    style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a5a28" }}
                  >
                    Secret Spell <span style={{ color: "#c94040" }}>*</span>
                  </label>
                  <a href="#" className="fw-link" style={{ fontSize: 12 }}>
                    Forgot your incantation?
                  </a>
                </div>
                <input
                  {...register("password", {
                    required: "password is required",
                    minLength: { value: 8, message: "minimum 8 characters required" },
                  })}
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  className="fw-input"
                />
                {errors.password && <p className="fw-error">{errors.password.message}</p>}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
                <button type="submit" className="fw-btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Casting your spell…" : "Enter the Great Hall"}
                </button>

                <button
                  type="button"
                  className="fw-btn-outline"
                  onClick={() => {/* Google OAuth handler */}}
                >
                  {/* Google icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path fill="#c9a84c" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#8a6a2a" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#5a4010" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#c9a84c" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Login with Google
                </button>
              </div>

              {/* Sign up link */}
              <p style={{ textAlign: "center", fontStyle: "italic", fontSize: 13, color: "#4a3010", marginTop: 22 }}>
                New to the wizarding world?{" "}
                <a href="/signup" className="fw-link">Enroll at Formwarts</a>
              </p>
            </form>
          </div>

          {/* Bottom gold accent line */}
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)" }} />

          {/* Footer */}
          <p
            className="fw-card-fadeup-4"
            style={{ textAlign: "center", fontStyle: "italic", fontSize: 12, color: "#2a1808", marginTop: 14 }}
          >
            Mischief managed. Your data is safe with us.
          </p>
        </div>
      </div>
    </>
  )
}
"use client"

// ─────────────────────────────────────────────────────────────
//  SignupForm.tsx  —  Formwarts · Hogwarts Theme
//  Logic: unchanged (react-hook-form + tRPC useSignup hook)
//  Only styling has been replaced with Hogwarts aesthetic
//
//  Fonts required in layout.tsx / globals.css:
//  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&display=swap');
// ─────────────────────────────────────────────────────────────

import { cn } from "~/lib/utils"
import { useForm } from "react-hook-form"
import { useSignup } from "~/hooks/api/auth"
import { useState } from "react"

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// ── Hogwarts houses config
const HOUSES = [
  { id: "gryffindor", label: "Gryffindor", symbol: "⚡", color: "#c94040", activeBg: "rgba(139,26,26,0.14)" },
  { id: "hufflepuff", label: "Hufflepuff", symbol: "✦",  color: "#c9a84c", activeBg: "rgba(201,168,76,0.12)" },
  { id: "ravenclaw",  label: "Ravenclaw",  symbol: "◈",  color: "#4080c9", activeBg: "rgba(10,61,107,0.18)"  },
  { id: "slytherin",  label: "Slytherin",  symbol: "⟁",  color: "#40a040", activeBg: "rgba(26,107,26,0.14)" },
] as const

type HouseId = typeof HOUSES[number]["id"]

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
    50%     { opacity: 0.55; transform: scale(1.5); }
  }
  @keyframes fw-pulse-gold {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
    50%     { box-shadow: 0 0 12px 2px rgba(201,168,76,0.18); }
  }
  .fw-star {
    position: fixed; border-radius: 50%; background: #c9a84c; pointer-events: none; z-index: 0;
    animation: fw-twinkle var(--dur,3s) ease-in-out infinite var(--delay,0s);
  }
  .fw-fadeup   { animation: fw-fadeup 0.65s ease both; }
  .fw-fadeup-1 { animation: fw-fadeup 0.65s ease 0.08s both; }
  .fw-fadeup-2 { animation: fw-fadeup 0.65s ease 0.16s both; }
  .fw-fadeup-3 { animation: fw-fadeup 0.65s ease 0.24s both; }
  .fw-fadeup-4 { animation: fw-fadeup 0.65s ease 0.32s both; }
  .fw-input {
    width: 100%; background: transparent;
    border: none; border-bottom: 1px solid rgba(201,168,76,0.22);
    color: #e8d5a3; font-family: 'IM Fell English', serif;
    font-style: italic; font-size: 15px;
    padding: 7px 0; outline: none;
    transition: border-color 0.25s; caret-color: #c9a84c;
  }
  .fw-input::placeholder { color: rgba(201,168,76,0.2); }
  .fw-input:focus { border-color: #c9a84c; }
  .fw-input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px #110c02 inset;
    -webkit-text-fill-color: #e8d5a3;
  }
  .fw-btn-primary {
    position: relative; overflow: hidden;
    width: 100%; padding: 11px 0;
    background: #c9a84c; color: #0a0600;
    font-family: 'Cinzel', serif; font-size: 11px;
    font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
    border: none; border-radius: 1px; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .fw-btn-primary:hover {
    background: #dbb95a; transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(201,168,76,0.22);
  }
  .fw-btn-primary:hover::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
    animation: fw-shimmer 0.55s ease;
  }
  .fw-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  .fw-error { font-family: 'IM Fell English', serif; font-style: italic; font-size: 12px; color: #c94040; margin-top: 5px; }
  .fw-link { color: #c9a84c; text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s; font-style: italic; }
  .fw-link:hover { color: #e8d5a3; }
  .fw-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  }
  .fw-house-btn {
    background: transparent; border-radius: 1px; cursor: pointer;
    padding: 9px 10px; text-align: left;
    transition: border-color 0.2s, background 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .fw-house-btn:hover { background: rgba(201,168,76,0.04); }
  .fw-strength-bar { height: 2px; border-radius: 1px; flex: 1; transition: background 0.3s; }
  .fw-step-dot {
    width: 18px; height: 18px; border-radius: 50%; border: 1px solid;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cinzel', serif; font-size: 9px; font-weight: 600;
    transition: all 0.25s; flex-shrink: 0;
  }
`

// ── Password strength helper
function getStrength(pw: string) {
  const checks = [pw.length >= 8, /[A-Z]/.test(pw), /[0-9]/.test(pw)]
  const score = checks.filter(Boolean).length
  const labels = ["", "Weak Charm", "Decent Spell", "Powerful Magic"]
  const colors = ["", "#c94040", "#c9a84c", "#40a040"]
  return { score, label: labels[score], color: colors[score] }
}

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {

  // ── Existing logic — untouched ──
  const { createUserWithEmailAndPasswordAsync } = useSignup()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  })

  const onsubmit = async (data: FormData) => {
    console.log(data)
    const { id } = await createUserWithEmailAndPasswordAsync({
      fullName: data.name,
      email: data.email,
      password: data.password,
    })
    console.log(id)
  }
  // ── End existing logic ──

  // ── UI-only state (not sent to API unless you want to extend)
  const [selectedHouse, setSelectedHouse] = useState<HouseId | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const watchedPassword = watch("password")
  const watchedConfirm  = watch("confirmPassword")
  const strength = getStrength(watchedPassword ?? "")

  const steps = ["Identity", "Credentials", "Your House"] as const

  return (
    <>
      <style>{styles}</style>

      {/* Full-page wrapper */}
      <div
        className={cn("relative min-h-screen w-full flex items-center justify-center overflow-hidden py-10", className)}
        style={{ background: "linear-gradient(135deg,#0a0600 0%,#110c02 55%,#0d0800 100%)", fontFamily: "'IM Fell English',serif" }}
        {...props}
      >
        {/* Noise */}
        <div className="fw-noise fixed inset-0 pointer-events-none opacity-30 z-0" />

        {/* Radial glow */}
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse 650px 550px at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />

        {/* Stars */}
        {Array.from({ length: 55 }).map((_, i) => (
          <span key={i} className="fw-star" style={{
            width:  `${Math.random() * 1.8 + 0.8}px`,
            height: `${Math.random() * 1.8 + 0.8}px`,
            top:    `${Math.random() * 100}%`,
            left:   `${Math.random() * 100}%`,
            opacity: Math.random() * 0.45 + 0.08,
            ["--dur" as string]:   `${2 + Math.random() * 4}s`,
            ["--delay" as string]: `${Math.random() * 5}s`,
          }} />
        ))}

        {/* ── Card ── */}
        <div className="relative z-10 w-full max-w-sm mx-4 fw-fadeup">
          {/* Top accent */}
          <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.6),transparent)" }} />

          <div className="px-9 py-10" style={{
            background: "linear-gradient(160deg,rgba(28,20,0,0.97) 0%,rgba(14,10,2,0.99) 100%)",
            border: "1px solid rgba(201,168,76,0.12)",
            boxShadow: "0 0 70px rgba(201,168,76,0.07), 0 0 0 0.5px rgba(201,168,76,0.08)",
          }}>

            {/* ── Header ── */}
            <div className="text-center mb-7 fw-fadeup-1">
              <div className="rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ width: 52, height: 52, border: "1px solid rgba(201,168,76,0.45)", background: "rgba(201,168,76,0.06)" }}>
                <span style={{ fontFamily: "'Cinzel',serif", fontWeight: 600, fontSize: 20, color: "#c9a84c" }}>F</span>
              </div>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 5 }}>
                Formwarts
              </p>
              <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: 22, fontWeight: 600, color: "#e8d5a3", lineHeight: 1.2, marginBottom: 4 }}>
                Enrollment Form
              </h1>
              <p style={{ fontStyle: "italic", fontSize: 15, color: "#7a5a28" }}>
                Your journey begins with a single quill stroke.
              </p>
            </div>

            {/* ── Step progress ── */}
            <div className="fw-fadeup-1 flex items-center gap-2 mb-7">
              {steps.map((s, i) => {
                const n = i + 1
                const done   = n < step
                const active = n === step
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 5, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                      <div className="fw-step-dot" style={{
                        borderColor:  done || active ? "#c9a84c" : "rgba(201,168,76,0.18)",
                        background:   done ? "#c9a84c" : active ? "rgba(201,168,76,0.08)" : "transparent",
                        color:        done ? "#0a0600" : active ? "#c9a84c" : "#2a1808",
                      }}>
                        {done ? "✓" : n}
                      </div>
                      <span style={{
                        fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.12em",
                        textTransform: "uppercase", whiteSpace: "nowrap",
                        color: active ? "#c9a84c" : done ? "#7a5a28" : "#2a1808",
                      }}>
                        {s}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ flex: 1, height: 1, background: done ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.1)" }} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* ── Form (single form, steps control visibility) ── */}
            <form onSubmit={handleSubmit(onsubmit)}>

              {/* ── STEP 1: Identity ── */}
              {step === 1 && (
                <div className="fw-fadeup-2" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {/* Full name */}
                  <div style={{ marginBottom: 22 }}>
                    <label htmlFor="name" style={{ display: "block", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a5a28", marginBottom: 8 }}>
                      Full Wizard Name <span style={{ color: "#c94040" }}>*</span>
                    </label>
                    <input
                      {...register("name", {
                        required: "name is required",
                        minLength: { value: 2, message: "minimum 2 characters" },
                      })}
                      id="name" type="text"
                      placeholder="e.g. Hermione Jean Granger"
                      className="fw-input"
                    />
                    {errors.name && <p className="fw-error">{errors.name.message}</p>}
                    <p style={{ fontStyle: "italic", fontSize: 12, color: "#3a2010", marginTop: 5 }}>
                      As it shall appear on your enrollment certificate.
                    </p>
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="email" style={{ display: "block", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a5a28", marginBottom: 8 }}>
                      Owl Post Address <span style={{ color: "#c94040" }}>*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "email is required",
                        maxLength: { value: 322, message: "322 character max" },
                      })}
                      id="email" type="email"
                      placeholder="you@hogwarts.edu"
                      className="fw-input"
                    />
                    {errors.email && <p className="fw-error">{errors.email.message}</p>}
                    <p style={{ fontStyle: "italic", fontSize: 12, color: "#3a2010", marginTop: 5 }}>
                      We'll dispatch an enrollment confirmation owl.
                    </p>
                  </div>

                  <button type="button" className="fw-btn-primary" onClick={() => setStep(2)}>
                    Next Incantation →
                  </button>
                </div>
              )}

              {/* ── STEP 2: Credentials ── */}
              {step === 2 && (
                <div className="fw-fadeup-2" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {/* Password */}
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="password" style={{ display: "block", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a5a28", marginBottom: 8 }}>
                      Secret Spell <span style={{ color: "#c94040" }}>*</span>
                    </label>
                    <input
                      {...register("password", {
                        required: "password is required",
                        minLength: { value: 8, message: "minimum 8 characters" },
                      })}
                      id="password" type="password"
                      placeholder="••••••••••••"
                      className="fw-input"
                    />
                    {errors.password && <p className="fw-error">{errors.password.message}</p>}

                    {/* Strength meter */}
                    {watchedPassword && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: "flex", gap: 5, marginBottom: 4 }}>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="fw-strength-bar"
                              style={{ background: i <= strength.score ? strength.color : "rgba(201,168,76,0.1)" }} />
                          ))}
                        </div>
                        <p style={{ fontStyle: "italic", fontSize: 12, color: strength.color }}>
                          {strength.label}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="confirm-password" style={{ display: "block", fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a5a28", marginBottom: 8 }}>
                      Confirm Secret Spell <span style={{ color: "#c94040" }}>*</span>
                    </label>
                    <input
                      {...register("confirmPassword", {
                        required: "confirm password is required",
                        minLength: { value: 8, message: "minimum 8 characters" },
                      })}
                      id="confirm-password" type="password"
                      placeholder="••••••••••••"
                      className="fw-input"
                    />
                    {errors.confirmPassword && <p className="fw-error">{errors.confirmPassword.message}</p>}
                    {/* Match feedback */}
                    {watchedConfirm && (
                      <p style={{ fontStyle: "italic", fontSize: 12, marginTop: 5,
                        color: watchedPassword === watchedConfirm ? "#40a040" : "#c94040" }}>
                        {watchedPassword === watchedConfirm ? "✦ Spells match perfectly" : "⚠ Spells do not match"}
                      </p>
                    )}
                    <p style={{ fontStyle: "italic", fontSize: 12, color: "#3a2010", marginTop: 5 }}>
                      Must be at least 8 characters long.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="button" onClick={() => setStep(1)}
                      style={{ flex: 1, padding: "10px 0", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", color: "#5a3a10", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.12em", borderRadius: 1, cursor: "pointer", transition: "all 0.2s" }}
                      onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.45)"; (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c" }}
                      onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "#5a3a10" }}>
                      ← Back
                    </button>
                    <button type="button" className="fw-btn-primary" style={{ flex: 1 }}
                      onClick={() => setStep(3)}
                      disabled={watchedPassword !== watchedConfirm && !!watchedConfirm}>
                      Next →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: House selection + submit ── */}
              {step === 3 && (
                <div className="fw-fadeup-2" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a5a28", marginBottom: 10 }}>
                    Your House
                  </p>

                  {/* House grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                    {HOUSES.map((h) => {
                      const active = selectedHouse === h.id
                      return (
                        <button key={h.id} type="button"
                          className="fw-house-btn"
                          onClick={() => setSelectedHouse(h.id)}
                          style={{
                            border: `1px solid ${active ? h.color : "rgba(201,168,76,0.14)"}`,
                            background: active ? h.activeBg : "transparent",
                          }}
                        >
                          <span style={{ fontSize: 16, color: active ? h.color : "rgba(201,168,76,0.25)" }}>{h.symbol}</span>
                          <div>
                            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.07em", color: active ? h.color : "#5a3a10" }}>
                              {h.label}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {!selectedHouse && (
                    <p style={{ fontStyle: "italic", fontSize: 12, color: "#3a2010", marginBottom: 16 }}>
                      The Sorting Hat will guide you — but you may choose.
                    </p>
                  )}

                  {/* Terms */}
                  <p style={{ fontStyle: "italic", fontSize: 12, color: "#3a2010", marginBottom: 24, lineHeight: 1.6 }}>
                    By enrolling, you agree to our{" "}
                    <a href="#" className="fw-link">Wizarding Terms</a> and{" "}
                    <a href="#" className="fw-link">Privacy Charm</a>.
                  </p>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="button" onClick={() => setStep(2)}
                      style={{ flex: 1, padding: "10px 0", background: "transparent", border: "1px solid rgba(201,168,76,0.2)", color: "#5a3a10", fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.12em", borderRadius: 1, cursor: "pointer" }}>
                      ← Back
                    </button>
                    <button type="submit" className="fw-btn-primary" style={{ flex: 1 }} disabled={isSubmitting}>
                      {isSubmitting ? "✦ Enrolling…" : "Complete Enrollment"}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* ── Divider ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)" }} />
              <span style={{ fontFamily: "'Cinzel',serif", color: "#3a2010", fontSize: 11 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)" }} />
            </div>

            {/* Sign in link */}
            <p style={{ textAlign: "center", fontStyle: "italic", fontSize: 13, color: "#4a3010" }}>
              Already enrolled?{" "}
              <a href="/login" className="fw-link">Enter the Great Hall</a>
            </p>
          </div>

          {/* Bottom accent */}
          <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(201,168,76,0.6),transparent)" }} />

          <p className="fw-fadeup-4" style={{ textAlign: "center", fontStyle: "italic", fontSize: 12, color: "#2a1808", marginTop: 14 }}>
            Your owl will arrive shortly. Mischief managed.
          </p>
        </div>
      </div>
    </>
  )
}
// SignupPage.jsx
// Formwarts — Hogwarts themed Signup / Enrollment Page
// Stack: React + Tailwind CSS
// Font setup needed in index.html or layout:
//   <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=IM+Fell+English:ital@0;1&display=swap" rel="stylesheet">
// Tailwind config — add to tailwind.config.js:
//   fontFamily: { cinzel: ['Cinzel','serif'], crimson: ['Crimson Text','serif'], fell: ['IM Fell English','serif'] }

import { useState, useEffect } from "react";

// ── House data
const HOUSES = [
  {
    id: "gryffindor",
    name: "Gryffindor",
    trait: "Brave & Bold",
    color: "#c94040",
    border: "border-red-800",
    hoverBorder: "hover:border-red-600",
    activeBg: "rgba(139,26,26,0.15)",
    activeBorder: "#c94040",
    symbol: "⚡",
  },
  {
    id: "hufflepuff",
    name: "Hufflepuff",
    trait: "Just & True",
    color: "#c9a84c",
    border: "border-amber-900",
    hoverBorder: "hover:border-amber-600",
    activeBg: "rgba(201,168,76,0.12)",
    activeBorder: "#c9a84c",
    symbol: "✦",
  },
  {
    id: "ravenclaw",
    name: "Ravenclaw",
    trait: "Wise & Sharp",
    color: "#4080c9",
    border: "border-blue-900",
    hoverBorder: "hover:border-blue-700",
    activeBg: "rgba(10,61,107,0.2)",
    activeBorder: "#4080c9",
    symbol: "◈",
  },
  {
    id: "slytherin",
    name: "Slytherin",
    trait: "Cunning & Pure",
    color: "#40a040",
    border: "border-green-900",
    hoverBorder: "hover:border-green-700",
    activeBg: "rgba(26,107,26,0.15)",
    activeBorder: "#40a040",
    symbol: "⟁",
  },
];

// ── Floating star
function Star({ style }) {
  return <div className="absolute rounded-full bg-amber-400 animate-pulse" style={style} />;
}

// ── Gold divider
function GoldLine({ symbol = "✦" }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent opacity-40" />
      <span className="text-amber-700 text-xs" style={{ fontFamily: "'Cinzel', serif" }}>{symbol}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent opacity-40" />
    </div>
  );
}

// ── Wizard input
function WizardInput({ id, label, type = "text", placeholder, value, onChange, required, hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className={`block text-[10px] tracking-[0.18em] uppercase mb-2 transition-colors duration-200`}
        style={{
          fontFamily: "'Cinzel', serif",
          color: focused ? "#c9a84c" : "#7a5a28",
        }}
      >
        {label} {required && <span style={{ color: "#c94040" }}>*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent pb-2 pt-1 outline-none transition-all duration-300"
          style={{
            borderBottom: `1px solid ${focused ? "#c9a84c" : "rgba(201,168,76,0.2)"}`,
            fontFamily: "'IM Fell English', serif",
            fontStyle: "italic",
            fontSize: "15px",
            color: "#e8d5a3",
          }}
        />
        {focused && (
          <div className="absolute bottom-0 left-0 w-full h-px animate-pulse"
            style={{ background: "linear-gradient(to right, #c9a84c, #e8d5a3, #c9a84c)" }}
          />
        )}
      </div>
      {hint && (
        <p className="mt-1.5 text-xs italic" style={{ fontFamily: "'IM Fell English', serif", color: "#5a4020" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

// ── Password strength indicator
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];
  const strength = checks.filter((c) => c.pass).length;
  const labels = ["", "Weak Charm", "Decent Spell", "Powerful Magic"];
  const colors = ["", "#c94040", "#c9a84c", "#40a040"];

  if (!password) return null;

  return (
    <div className="mb-5 -mt-2">
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-1 h-0.5 rounded transition-all duration-300"
            style={{ background: i <= strength ? colors[strength] : "rgba(201,168,76,0.1)" }}
          />
        ))}
      </div>
      <p className="text-xs italic" style={{ fontFamily: "'IM Fell English', serif", color: colors[strength] || "#5a4020" }}>
        {labels[strength] || "Enter a spell..."}
      </p>
    </div>
  );
}

// ── House Selector
function HouseSelector({ selected, onSelect }) {
  return (
    <div className="mb-6">
      <p
        className="text-[10px] tracking-[0.18em] uppercase mb-3"
        style={{ fontFamily: "'Cinzel', serif", color: "#7a5a28" }}
      >
        Your House <span style={{ color: "#c94040" }}>*</span>
      </p>
      <div className="grid grid-cols-2 gap-2">
        {HOUSES.map((house) => {
          const isSelected = selected === house.id;
          return (
            <button
              key={house.id}
              type="button"
              onClick={() => onSelect(house.id)}
              className="relative px-3 py-2.5 text-left transition-all duration-250 group"
              style={{
                border: `1px solid ${isSelected ? house.activeBorder : "rgba(201,168,76,0.12)"}`,
                background: isSelected ? house.activeBg : "transparent",
                borderRadius: "1px",
              }}
            >
              {isSelected && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 20px ${house.activeBg}`,
                    borderRadius: "1px",
                  }}
                />
              )}
              <div className="flex items-center gap-2">
                <span className="text-base" style={{ color: isSelected ? house.color : "rgba(201,168,76,0.3)" }}>
                  {house.symbol}
                </span>
                <div>
                  <div
                    className="text-xs font-semibold tracking-wide"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      color: isSelected ? house.color : "#7a5a28",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {house.name}
                  </div>
                  <div
                    className="italic"
                    style={{
                      fontFamily: "'IM Fell English', serif",
                      fontSize: "11px",
                      color: isSelected ? house.color + "aa" : "#4a3010",
                    }}
                  >
                    {house.trait}
                  </div>
                </div>
              </div>
              {isSelected && (
                <div
                  className="absolute top-1.5 right-2 text-[8px]"
                  style={{ fontFamily: "'Cinzel', serif", color: house.color, letterSpacing: "0.1em" }}
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
      {!selected && (
        <p className="mt-2 text-xs italic" style={{ fontFamily: "'IM Fell English', serif", color: "#4a3010" }}>
          The Sorting Hat will guide you — but you may choose.
        </p>
      )}
    </div>
  );
}

// ── Progress steps
function EnrollmentSteps({ step }) {
  const steps = ["Identity", "Credentials", "Your House"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => {
        const active = i + 1 === step;
        const done = i + 1 < step;
        return (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Cinzel', serif",
                  background: done ? "#c9a84c" : active ? "rgba(201,168,76,0.1)" : "transparent",
                  border: `1px solid ${done || active ? "#c9a84c" : "rgba(201,168,76,0.2)"}`,
                  color: done ? "#0a0600" : active ? "#c9a84c" : "#4a3010",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className="text-[9px] tracking-widest uppercase truncate"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: active ? "#c9a84c" : done ? "#8a6a2a" : "#3a2a10",
                }}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px"
                style={{ background: done ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.1)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Signup Page
export default function SignupPage({ onNavigateToLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    house: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        width: Math.random() * 2 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    );
  }, []);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target ? e.target.value : e }));

  const nextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setEnrolled(true);
    // TODO: trpc.auth.register.mutate({ ...form })
  };

  const selectedHouse = HOUSES.find((h) => h.id === form.house);

  // ── Enrolled success screen
  if (enrolled) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0600 0%, #110c02 100%)" }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-amber-400 animate-pulse"
            style={{ width: s.width, height: s.width, top: `${s.top}%`, left: `${s.left}%`, opacity: s.opacity, animationDuration: `${s.duration}s` }}
          />
        ))}
        <div className="relative z-10 text-center px-6" style={{ animation: "fadeUp 0.7s ease both" }}>
          <div
            className="w-20 h-20 rounded-full border border-amber-500 flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(201,168,76,0.08)", fontSize: "36px" }}
          >
            {selectedHouse?.symbol || "⚡"}
          </div>
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ fontFamily: "'Cinzel', serif", color: selectedHouse?.color || "#c9a84c" }}
          >
            {selectedHouse?.name || "Hogwarts"}!
          </h2>
          <p
            className="text-lg italic mb-2"
            style={{ fontFamily: "'IM Fell English', serif", color: "#e8d5a3" }}
          >
            The Sorting Hat has spoken.
          </p>
          <p
            className="text-sm italic mb-8"
            style={{ fontFamily: "'IM Fell English', serif", color: "#7a5a28" }}
          >
            Your enrollment owl has been dispatched to {form.email}.
          </p>
          <button
            onClick={onNavigateToLogin}
            className="px-8 py-3 font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              background: selectedHouse?.color || "#c9a84c",
              color: "#0a0600",
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              borderRadius: "1px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Enter the Great Hall
          </button>
        </div>
        <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }`}</style>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-10"
      style={{ background: "linear-gradient(135deg, #0a0600 0%, #110c02 50%, #0d0800 100%)", fontFamily: "'Crimson Text', serif" }}
    >
      {/* Noise */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-30"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 600px 500px at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
      />

      {/* Stars */}
      {stars.map((s) => (
        <Star key={s.id} style={{ width: s.width, height: s.width, top: `${s.top}%`, left: `${s.left}%`, opacity: s.opacity, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }} />
      ))}

      {/* Card */}
      <div className="relative z-20 w-full max-w-md mx-4" style={{ animation: "fadeUp 0.7s ease both" }}>
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

        <div
          className="border border-amber-900 border-opacity-30 px-10 py-10"
          style={{
            background: "linear-gradient(160deg, rgba(30,21,0,0.97) 0%, rgba(17,12,2,0.99) 100%)",
            boxShadow: "0 0 60px rgba(201,168,76,0.07), 0 0 0 0.5px rgba(201,168,76,0.08)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-7" style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
            <div
              className="w-14 h-14 border border-amber-600 border-opacity-60 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(201,168,76,0.06)" }}
            >
              <span className="text-amber-500 text-2xl" style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}>F</span>
            </div>
            <div className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
              Formwarts
            </div>
            <h1 className="text-amber-100 text-2xl font-semibold leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
              Enrollment Form
            </h1>
            <p className="text-amber-700 text-base mt-1 italic" style={{ fontFamily: "'IM Fell English', serif" }}>
              Your journey begins with a single quill stroke.
            </p>
          </div>

          {/* Steps */}
          <EnrollmentSteps step={step} />

          <form onSubmit={nextStep}>
            {/* Step 1 — Identity */}
            {step === 1 && (
              <div style={{ animation: "fadeUp 0.4s ease both" }}>
                <WizardInput
                  id="name"
                  label="Full Wizard Name"
                  placeholder="e.g. Hermione Jean Granger"
                  value={form.name}
                  onChange={update("name")}
                  required
                  hint="As it shall appear on your enrollment certificate."
                />
                <WizardInput
                  id="email"
                  label="Owl Post Address"
                  type="email"
                  placeholder="you@hogwarts.edu"
                  value={form.email}
                  onChange={update("email")}
                  required
                  hint="We'll dispatch an enrollment confirmation owl."
                />
              </div>
            )}

            {/* Step 2 — Credentials */}
            {step === 2 && (
              <div style={{ animation: "fadeUp 0.4s ease both" }}>
                <WizardInput
                  id="password"
                  label="Secret Spell (Password)"
                  type="password"
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={update("password")}
                  required
                />
                <PasswordStrength password={form.password} />
                <WizardInput
                  id="confirm"
                  label="Confirm Secret Spell"
                  type="password"
                  placeholder="••••••••••••"
                  value={form.confirmPassword}
                  onChange={update("confirmPassword")}
                  required
                  hint={
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? "⚠ Spells do not match"
                      : form.confirmPassword && form.password === form.confirmPassword
                      ? "✦ Spells match perfectly"
                      : ""
                  }
                />
              </div>
            )}

            {/* Step 3 — House */}
            {step === 3 && (
              <div style={{ animation: "fadeUp 0.4s ease both" }}>
                <HouseSelector selected={form.house} onSelect={(h) => setForm((f) => ({ ...f, house: h }))} />

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer group mb-2">
                  <div
                    className="w-4 h-4 border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200 cursor-pointer"
                    style={{
                      borderColor: form.agree ? "#c9a84c" : "rgba(201,168,76,0.2)",
                      background: form.agree ? "rgba(201,168,76,0.1)" : "transparent",
                      borderRadius: "1px",
                    }}
                    onClick={() => setForm((f) => ({ ...f, agree: !f.agree }))}
                  >
                    {form.agree && <span style={{ color: "#c9a84c", fontSize: "10px" }}>✓</span>}
                  </div>
                  <span
                    className="text-xs leading-relaxed"
                    style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", color: "#5a4020" }}
                  >
                    I solemnly swear I agree to the{" "}
                    <span style={{ color: "#c9a84c", textDecoration: "underline", cursor: "pointer" }}>
                      Wizarding Terms
                    </span>{" "}
                    and{" "}
                    <span style={{ color: "#c9a84c", textDecoration: "underline", cursor: "pointer" }}>
                      Privacy Charm
                    </span>
                    .
                  </span>
                </label>
              </div>
            )}

            {/* Navigation buttons */}
            <div className={`flex gap-3 mt-6 ${step > 1 ? "flex-row" : "flex-col"}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 py-3 border border-amber-900 border-opacity-40 transition-all duration-200 hover:border-amber-700"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    color: "#7a5a28",
                    background: "transparent",
                    cursor: "pointer",
                    borderRadius: "1px",
                  }}
                >
                  ← Previous
                </button>
              )}
              <button
                type="submit"
                disabled={
                  loading ||
                  (step === 3 && (!form.house || !form.agree)) ||
                  (step === 2 && form.password !== form.confirmPassword)
                }
                className="flex-1 py-3 relative overflow-hidden group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "#c9a84c",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  color: "#0a0600",
                  borderRadius: "1px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span className={loading ? "opacity-0" : "opacity-100"}>
                  {step === 3 ? "Complete Enrollment" : "Next Incantation →"}
                </span>
                {loading && (
                  <span
                    className="absolute inset-0 flex items-center justify-center gap-2"
                    style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "14px" }}
                  >
                    <span className="animate-spin">✦</span>
                    The Sorting Hat deliberates...
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 -skew-x-12" />
              </button>
            </div>
          </form>

          <GoldLine />

          {/* Login link */}
          <p
            className="text-center text-xs italic"
            style={{ fontFamily: "'IM Fell English', serif", color: "#5a4020" }}
          >
            Already enrolled?{" "}
            <button
              onClick={onNavigateToLogin}
              className="transition-colors duration-200 underline underline-offset-2"
              style={{ color: "#c9a84c" }}
              onMouseEnter={(e) => (e.target.style.color = "#e8d5a3")}
              onMouseLeave={(e) => (e.target.style.color = "#c9a84c")}
            >
              Enter the Great Hall
            </button>
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <p
          className="text-center text-xs mt-4 italic"
          style={{ fontFamily: "'IM Fell English', serif", color: "#3a2a10" }}
        >
          Your owl will arrive shortly. Mischief managed.
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
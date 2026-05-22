// LoginPage.jsx
// Formwarts — Hogwarts themed Login Page
// Stack: React + Tailwind CSS
// Font setup needed in index.html or layout:
//   <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=IM+Fell+English:ital@0;1&display=swap" rel="stylesheet">
// Tailwind config — add to tailwind.config.js:
//   fontFamily: { cinzel: ['Cinzel','serif'], crimson: ['Crimson Text','serif'], fell: ['IM Fell English','serif'] }

// import { useState, useEffect } from "react";

// // ── Floating star particle
// function Star({ style }) {
//   return (
//     <div
//       className="absolute rounded-full bg-amber-400 animate-pulse"
//       style={style}
//     />
//   );
// }

// // ── Golden divider line
// function GoldLine() {
//   return (
//     <div className="flex items-center gap-3 my-6">
//       <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-50" />
//       <span className="text-amber-600 text-xs font-cinzel tracking-widest">✦</span>
//       <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-50" />
//     </div>
//   );
// }

// // ── Input field with wizarding style
// function WizardInput({ id, label, type = "text", placeholder, value, onChange, required }) {
//   const [focused, setFocused] = useState(false);

//   return (
//     <div className="relative mb-5">
//       <label
//         htmlFor={id}
//         className={`
//           block font-cinzel text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-200
//           ${focused ? "text-amber-400" : "text-amber-700"}
//         `}
//       >
//         {label} {required && <span className="text-red-600">*</span>}
//       </label>
//       <div className="relative">
//         <input
//           id={id}
//           type={type}
//           value={value}
//           onChange={onChange}
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//           placeholder={placeholder}
//           className={`
//             w-full bg-transparent border-b pb-2 pt-1
//             font-fell italic text-amber-100 text-base
//             placeholder-amber-900 placeholder-opacity-60
//             outline-none transition-all duration-300
//             ${focused ? "border-amber-500" : "border-amber-900 border-opacity-50"}
//           `}
//         />
//         {focused && (
//           <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 animate-pulse w-full" />
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Main Login Page
// export default function LoginPage({ onNavigateToSignup }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [stars, setStars] = useState([]);
//   const [castEffect, setCastEffect] = useState(false);

//   // Generate stars on mount
//   useEffect(() => {
//     const s = Array.from({ length: 60 }, (_, i) => ({
//       id: i,
//       width: Math.random() * 2 + 1,
//       top: Math.random() * 100,
//       left: Math.random() * 100,
//       duration: 2 + Math.random() * 4,
//       delay: Math.random() * 4,
//       opacity: Math.random() * 0.6 + 0.1,
//     }));
//     setStars(s);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setCastEffect(true);
//     setLoading(true);
//     // Simulate API call
//     await new Promise((r) => setTimeout(r, 2000));
//     setLoading(false);
//     setCastEffect(false);
//     // TODO: replace with actual tRPC auth.login call
//     // trpc.auth.login.mutate({ email, password })
//   };

//   return (
//     <div
//       className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
//       style={{
//         background: "linear-gradient(135deg, #0a0600 0%, #110c02 50%, #0d0800 100%)",
//         fontFamily: "'Crimson Text', serif",
//       }}
//     >
//       {/* Noise texture overlay */}
//       <div
//         className="fixed inset-0 pointer-events-none z-10 opacity-30"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Radial glow */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background: "radial-gradient(ellipse 600px 500px at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
//         }}
//       />

//       {/* Stars */}
//       {stars.map((s) => (
//         <Star
//           key={s.id}
//           style={{
//             width: s.width,
//             height: s.width,
//             top: `${s.top}%`,
//             left: `${s.left}%`,
//             opacity: s.opacity,
//             animationDuration: `${s.duration}s`,
//             animationDelay: `${s.delay}s`,
//           }}
//         />
//       ))}

//       {/* Cast spell sparkle effect */}
//       {castEffect && (
//         <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 rounded-full bg-amber-400"
//               style={{
//                 animation: `sparkle-out 0.8s ease-out forwards`,
//                 transform: `rotate(${i * 30}deg) translateX(0)`,
//                 animationDelay: `${i * 0.04}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* Main card */}
//       <div
//         className={`
//           relative z-20 w-full max-w-md mx-4
//           transition-all duration-500
//           ${castEffect ? "scale-[1.02]" : "scale-100"}
//         `}
//         style={{ animation: "fadeUp 0.7s ease both" }}
//       >
//         {/* Top gold border accent */}
//         <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-0" />

//         <div
//           className="border border-amber-900 border-opacity-30 px-10 py-10"
//           style={{
//             background: "linear-gradient(160deg, rgba(30,21,0,0.97) 0%, rgba(17,12,2,0.99) 100%)",
//             boxShadow: "0 0 60px rgba(201,168,76,0.08), 0 0 0 0.5px rgba(201,168,76,0.1)",
//           }}
//         >
//           {/* Logo */}
//           <div className="text-center mb-8" style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
//             <div
//               className="w-14 h-14 border border-amber-600 border-opacity-60 rounded-full flex items-center justify-center mx-auto mb-4"
//               style={{ background: "rgba(201,168,76,0.06)" }}
//             >
//               <span
//                 className="text-amber-500 text-2xl"
//                 style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
//               >
//                 F
//               </span>
//             </div>
//             <div
//               className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-1"
//               style={{ fontFamily: "'Cinzel', serif" }}
//             >
//               Formwarts
//             </div>
//             <h1
//               className="text-amber-100 text-2xl font-semibold leading-tight"
//               style={{ fontFamily: "'Cinzel', serif" }}
//             >
//               Welcome back,
//             </h1>
//             <p
//               className="text-amber-700 text-base mt-1 italic"
//               style={{ fontFamily: "'IM Fell English', serif" }}
//             >
//               The Great Hall awaits your return.
//             </p>
//           </div>

//           <GoldLine />

//           {/* Demo credentials hint */}
//           <div
//             className="mb-6 px-4 py-3 border border-amber-900 border-opacity-40 text-center"
//             style={{
//               background: "rgba(201,168,76,0.04)",
//               animation: "fadeUp 0.6s ease 0.2s both",
//             }}
//           >
//             <p className="text-amber-700 text-xs" style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" }}>
//               Demo Credentials
//             </p>
//             <p className="text-amber-500 text-xs mt-1 font-fell italic">
//               demo@formwarts.dev · expelliarmus
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} style={{ animation: "fadeUp 0.6s ease 0.25s both" }}>
//             <WizardInput
//               id="email"
//               label="Owl Post Address"
//               type="email"
//               placeholder="harry@hogwarts.edu"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <WizardInput
//               id="password"
//               label="Secret Spell"
//               type="password"
//               placeholder="••••••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             {/* Forgot password */}
//             <div className="text-right mb-6 -mt-2">
//               <button
//                 type="button"
//                 className="text-amber-700 hover:text-amber-500 transition-colors duration-200 italic"
//                 style={{ fontFamily: "'IM Fell English', serif", fontSize: "13px" }}
//               >
//                 Forgot your incantation?
//               </button>
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 relative overflow-hidden group transition-all duration-300 disabled:opacity-70"
//               style={{
//                 background: loading ? "rgba(201,168,76,0.7)" : "#c9a84c",
//                 fontFamily: "'Cinzel', serif",
//                 fontSize: "11px",
//                 letterSpacing: "0.15em",
//                 fontWeight: 600,
//                 color: "#0a0600",
//                 borderRadius: "1px",
//                 border: "none",
//                 cursor: loading ? "not-allowed" : "pointer",
//               }}
//             >
//               <span className={`transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"}`}>
//                 Enter the Great Hall
//               </span>
//               {loading && (
//                 <span
//                   className="absolute inset-0 flex items-center justify-center gap-2"
//                   style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "14px" }}
//                 >
//                   <span className="animate-spin">✦</span>
//                   Casting your spell...
//                 </span>
//               )}
//               {/* Hover shimmer */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 -skew-x-12" />
//             </button>
//           </form>

//           <GoldLine />

//           {/* OAuth */}
//           <div style={{ animation: "fadeUp 0.6s ease 0.35s both" }}>
//             <p
//               className="text-center text-amber-800 text-xs mb-4"
//               style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.1em" }}
//             >
//               Or enter via Floo Network
//             </p>
//             <div className="flex gap-3">
//               {/* GitHub */}
//               <button
//                 className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-amber-900 border-opacity-40 hover:border-amber-600 hover:bg-amber-950 transition-all duration-200 group"
//                 style={{ borderRadius: "1px" }}
//               >
//                 <svg className="w-4 h-4 text-amber-600 group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
//                 </svg>
//                 <span
//                   className="text-amber-700 group-hover:text-amber-500 transition-colors text-xs"
//                   style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}
//                 >
//                   GitHub
//                 </span>
//               </button>
//               {/* Google */}
//               <button
//                 className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-amber-900 border-opacity-40 hover:border-amber-600 hover:bg-amber-950 transition-all duration-200 group"
//                 style={{ borderRadius: "1px" }}
//               >
//                 <svg className="w-4 h-4" viewBox="0 0 24 24">
//                   <path fill="#c9a84c" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                   <path fill="#8a6a2a" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                   <path fill="#6a4a1a" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                   <path fill="#c9a84c" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                 </svg>
//                 <span
//                   className="text-amber-700 group-hover:text-amber-500 transition-colors text-xs"
//                   style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}
//                 >
//                   Google
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Signup link */}
//           <div
//             className="text-center mt-8"
//             style={{ animation: "fadeUp 0.6s ease 0.4s both" }}
//           >
//             <p
//               className="text-amber-800 text-xs"
//               style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic" }}
//             >
//               New to the wizarding world?{" "}
//               <button
//                 onClick={onNavigateToSignup}
//                 className="text-amber-500 hover:text-amber-300 transition-colors duration-200 underline underline-offset-2"
//               >
//                 Enroll at Formwarts
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Bottom gold border accent */}
//         <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

//         {/* Footer note */}
//         <p
//           className="text-center text-amber-900 text-xs mt-4 italic"
//           style={{ fontFamily: "'IM Fell English', serif" }}
//         >
//           Mischief managed. Your data is safe with us.
//         </p>
//       </div>

//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes sparkle-out {
//           0% { transform: rotate(var(--r, 0deg)) translateX(0) scale(1); opacity: 1; }
//           100% { transform: rotate(var(--r, 0deg)) translateX(80px) scale(0); opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client"

import { useRouter } from "next/navigation";

export default function Navbar() {

  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-[rgba(201,168,76,0.2)] bg-black/40 px-10 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c9a84c] text-sm font-display text-[#c9a84c]">
          F
        </div>

        <h1 className="font-display text-sm tracking-wider text-[#c9a84c]">
          Formwarts
        </h1>
      </div>

      <ul className="hidden md:flex items-center gap-8 font-display text-[11px] uppercase tracking-[0.2em] text-[#9a8060]">
        <li><a href="#features">Features</a></li>
        <li><a href="#themes">Themes</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#">Docs</a></li>
      </ul>

      <div className="flex items-center gap-3">
        <button
        onClick={()=> router.push('/login')}
        className="border border-[#8a6a2a] px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-[#c9a84c] transition hover:bg-[#c9a84c]/10">
          Login
        </button>

        <button
        onClick={()=> router.push("/signup")}
        className="bg-[#c9a84c] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-[#e8d5a3]">
          Get Started
        </button>
      </div>
    </nav>
  );
}
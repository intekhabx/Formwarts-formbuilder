export default function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-36 text-center">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/10 blur-3xl" />

      <div className="relative z-10">
        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
          The Sorting Hat Awaits
        </p>

        <h2 className="mt-6 font-display text-6xl leading-tight text-[#e8d5a3]">
          Your first scroll
          <br />
          takes
          <span className="font-accent italic text-[#c9a84c]">
            {' '}30 seconds.
          </span>
        </h2>

        <p className="mt-8 font-accent text-xl italic text-[#9a8060]">
          No wand experience required.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <button className="bg-[#c9a84c] px-10 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#e8d5a3]">
            Accio My Account
          </button>

          <button className="border border-[#c9a84c] px-10 py-4 font-display text-xs uppercase tracking-[0.2em] text-[#c9a84c] transition hover:bg-[#c9a84c]/10">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}
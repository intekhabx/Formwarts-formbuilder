export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="absolute h-[600px] w-[600px] rounded-full bg-[#c9a84c]/10 blur-3xl" />

      <p className="mb-6 font-display text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
        Est. 2024 · Hogsmeade, Scotland
      </p>

      <h1 className="max-w-5xl font-display text-5xl font-bold leading-tight md:text-8xl">
        Every great wizard
        <br />
        <span className="font-accent italic text-[#c9a84c]">
          fills a form first.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl font-accent text-xl italic text-[#9a8060]">
        Create enchanted forms. Summon responses. Unlock powerful insights from across the wizarding world.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button className="bg-[#c9a84c] px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:-translate-y-1 hover:bg-[#e8d5a3]">
          Start casting
        </button>

        <button className="border border-[#c9a84c] px-8 py-4 font-display text-xs uppercase tracking-[0.2em] text-[#c9a84c] transition hover:bg-[#c9a84c]/10">
          View spellbook
        </button>
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-center gap-10 border-t border-[rgba(201,168,76,0.2)] pt-10">
        <div>
          <h2 className="font-display text-3xl text-[#c9a84c]">12,400+</h2>
          <p className="font-display text-xs uppercase tracking-[0.15em] text-[#5a4828]">
            Scrolls Created
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-[#c9a84c]">1.2M+</h2>
          <p className="font-display text-xs uppercase tracking-[0.15em] text-[#5a4828]">
            Owls Dispatched
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-[#c9a84c]">98%</h2>
          <p className="font-display text-xs uppercase tracking-[0.15em] text-[#5a4828]">
            Spells Successful
          </p>
        </div>
      </div>
    </section>
  );
}
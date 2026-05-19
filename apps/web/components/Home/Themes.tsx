const themes = [
  {
    name: 'Hogwarts',
    color: 'from-[#1a0f00] to-[#2a1500]',
    icon: '⚡',
  },
  {
    name: 'Death Note',
    color: 'from-black to-zinc-900',
    icon: '☠',
  },
  {
    name: 'Cyberpunk',
    color: 'from-[#000510] to-[#001030]',
    icon: '◈',
  },
  {
    name: 'VS Code',
    color: 'from-[#001a33] to-[#002244]',
    icon: '❯',
  },
];

export default function Themes() {
  return (
    <section id="themes" className="bg-[#110c02] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
            Theme Gallery
          </p>

          <h2 className="mt-5 font-display text-5xl text-[#e8d5a3]">
            Choose your aesthetic
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className="border border-[rgba(201,168,76,0.15)] bg-[#1a1200] p-5 transition hover:-translate-y-1 hover:bg-[#261c00]"
            >
              <div
                className={`mb-4 flex h-28 items-center justify-center rounded bg-gradient-to-br ${theme.color} text-3xl text-[#c9a84c]`}
              >
                {theme.icon}
              </div>

              <h3 className="font-display text-sm uppercase tracking-[0.15em] text-[#e8d5a3]">
                {theme.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
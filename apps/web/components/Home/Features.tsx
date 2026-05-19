const features = [
  {
    icon: '✦',
    title: 'Quill Text & Parchment Essays',
    desc: 'Short text, long text, email, number, rating and more with magical styling.',
  },
  {
    icon: '◈',
    title: 'Four House Themes',
    desc: 'Choose Gryffindor, Slytherin, Ravenclaw or Hufflepuff inspired aesthetics.',
  },
  {
    icon: '⚡',
    title: 'Marauder Analytics',
    desc: 'Track responses, completion rates and house breakdown charts in real time.',
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
            The Spellbook
          </p>

          <h2 className="mt-5 font-display text-5xl text-[#e8d5a3]">
            Everything a wizard needs
          </h2>
        </div>

        <div className="grid gap-px border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.2)] md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-[#110c02] p-10 transition hover:bg-[#1e1500]">
              <div className="mb-5 text-3xl text-[#c9a84c]">{feature.icon}</div>

              <h3 className="mb-3 font-display text-lg text-[#e8d5a3]">
                {feature.title}
              </h3>

              <p className="text-[#9a8060]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
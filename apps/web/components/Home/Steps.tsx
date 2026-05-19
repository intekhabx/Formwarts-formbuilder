const steps = [
  {
    number: 'I',
    spell: 'Scribblificus',
    title: 'Write your scroll',
    desc: 'Add magical fields and customize your wizarding theme.',
  },
  {
    number: 'II',
    spell: 'Portus',
    title: 'Publish your form',
    desc: 'Share through links and magical QR codes.',
  },
  {
    number: 'III',
    spell: 'Revelio',
    title: 'View analytics',
    desc: 'Track responses and house breakdowns in real time.',
  },
];

export default function Steps() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
            The Process
          </p>

          <h2 className="mt-5 font-display text-5xl text-[#e8d5a3]">
            Three spells. That's all.
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a84c] font-display text-2xl text-[#c9a84c]">
                {step.number}
              </div>

              <p className="mt-6 font-accent text-lg italic text-[#c9a84c]">
                {step.spell}
              </p>

              <h3 className="mt-3 font-display text-xl text-[#e8d5a3]">
                {step.title}
              </h3>

              <p className="mt-4 text-[#9a8060]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
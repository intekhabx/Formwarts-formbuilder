import { useState } from 'react';

const houses = [
  {
    name: 'Gryffindor',
    color: 'text-red-500 border-red-500',
  },
  {
    name: 'Hufflepuff',
    color: 'text-yellow-500 border-yellow-500',
  },
  {
    name: 'Ravenclaw',
    color: 'text-blue-400 border-blue-400',
  },
  {
    name: 'Slytherin',
    color: 'text-green-500 border-green-500',
  },
];

export default function FormPreview() {
  const [selected, setSelected] = useState('Gryffindor');

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded border border-[rgba(201,168,76,0.2)] bg-[#1e1500]">
        <div className="flex items-center gap-2 border-b border-[rgba(201,168,76,0.2)] bg-[#1a1200] px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-red-700" />
          <span className="h-3 w-3 rounded-full bg-yellow-700" />
          <span className="h-3 w-3 rounded-full bg-green-700" />

          <div className="ml-4 flex-1 rounded border border-[#2a1e00] bg-[#261c00] px-4 py-1 text-center text-xs text-[#5a4828]">
            formwarts.dev/hogwarts-enrollment
          </div>
        </div>

        <div className="grid gap-10 p-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-[#e8d5a3]">
              Hogwarts Enrollment Form
            </h2>

            <p className="mt-2 border-b border-[rgba(201,168,76,0.2)] pb-6 font-accent italic text-[#9a8060]">
              Step 2 of 5 · Begin your magical journey.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.2em] text-[#9a8060]">
                  Your Full Name
                </label>

                <input
                  className="w-full border-b border-[#5a4828] bg-transparent py-2 outline-none focus:border-[#c9a84c]"
                  placeholder="Harry James Potter"
                />
              </div>

              <div>
                <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.2em] text-[#9a8060]">
                  Do you have a wand?
                </label>

                <input
                  className="w-full border-b border-[#5a4828] bg-transparent py-2 outline-none focus:border-[#c9a84c]"
                  placeholder="Yes / No"
                />
              </div>

              <div>
                <label className="mb-4 block font-display text-[10px] uppercase tracking-[0.2em] text-[#9a8060]">
                  Choose your house
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {houses.map((house) => (
                    <button
                      key={house.name}
                      onClick={() => setSelected(house.name)}
                      className={`border px-4 py-3 font-display text-xs uppercase tracking-[0.15em] transition ${house.color} ${
                        selected === house.name
                          ? 'bg-[#261c00]'
                          : 'border-[#2a1e00]'
                      }`}
                    >
                      {house.name}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#c9a84c] py-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#e8d5a3]">
                Cast The Spell
              </button>
            </div>
          </div>

          <div className="border-l border-[rgba(201,168,76,0.2)] pl-8">
            <p className="font-display text-[10px] uppercase tracking-[0.25em] text-[#5a4828]">
              Marauder's Map
            </p>

            <div className="mt-8 border-b border-[#2a1e00] pb-6">
              <h3 className="font-display text-5xl text-[#c9a84c]">
                328
              </h3>

              <p className="font-accent italic text-[#9a8060]">
                Owls received this month
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {[
                ['Gryffindor', '45%', 'bg-red-700'],
                ['Ravenclaw', '25%', 'bg-blue-700'],
                ['Hufflepuff', '20%', 'bg-yellow-700'],
                ['Slytherin', '10%', 'bg-green-700'],
              ].map(([name, value, color]) => (
                <div key={name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{name}</span>
                    <span className="text-[#5a4828]">{value}</span>
                  </div>

                  <div className="h-1 bg-[#2a1e00]">
                    <div
                      className={`h-1 ${color}`}
                      style={{ width: value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
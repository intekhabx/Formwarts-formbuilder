const testimonials = [
  {
    name: 'Harry Potter',
    role: 'Auror Department',
    quote:
      'The Sorting Hat form got hundreds of responses in just one week.',
    house: 'Gryffindor',
  },
  {
    name: 'Hermione Granger',
    role: 'Minister for Magic',
    quote:
      'The analytics and magical themes are absolutely brilliant.',
    house: 'Ravenclaw',
  },
  {
    name: 'Draco Malfoy',
    role: 'Malfoy Enterprises',
    quote:
      'The Slytherin theme looks intimidating and elegant.',
    house: 'Slytherin',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#110c02] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">
            Common Rooms
          </p>

          <h2 className="mt-5 font-display text-5xl text-[#e8d5a3]">
            What wizards say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="border border-[rgba(201,168,76,0.2)] bg-[#1a1200] p-8"
            >
              <p className="font-accent text-lg italic text-[#9a8060]">
                "{item.quote}"
              </p>

              <div className="mt-8">
                <h3 className="font-display text-sm uppercase tracking-[0.15em] text-[#e8d5a3]">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-[#5a4828]">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
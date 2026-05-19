const items = [
  'Quill Text Fields',
  'Owl Post Email',
  'Parchment Essays',
  'Sorting Hat Logic',
  'Marauder Analytics',
  'OWL Reports',
  'Wax Seal QR',
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-[rgba(201,168,76,0.2)] bg-[#110c02] py-4">
      <div className="animate-[marquee_25s_linear_infinite] flex w-max gap-10">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 font-display text-[10px] uppercase tracking-[0.25em] text-[#5a4828]"
          >
            <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
export default function Footer() {
  return (
    <footer className="border-t border-[rgba(201,168,76,0.2)] bg-[#110c02] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <h2 className="font-display text-lg text-[#c9a84c]">
            Formwarts
          </h2>

          <p className="font-accent italic text-[#5a4828]">
            Mischief managed.
          </p>
        </div>

        <ul className="flex gap-6 font-display text-[10px] uppercase tracking-[0.2em] text-[#9a8060]">
          <li>Features</li>
          <li>Themes</li>
          <li>Pricing</li>
          <li>Docs</li>
        </ul>
      </div>
    </footer>
  );
}
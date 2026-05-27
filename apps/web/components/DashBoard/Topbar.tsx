// components/Topbar.jsx

export default function Topbar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#1b1b1b] border border-gray-700 rounded-xl px-4 py-2 text-white"
        />

        <button className="bg-white text-black px-4 py-2 rounded-xl">
          Github
        </button>
      </div>
    </div>
  );
}
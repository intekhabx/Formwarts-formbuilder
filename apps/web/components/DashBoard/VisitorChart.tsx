// components/VisitorsChart.jsx

export default function VisitorsChart() {
  return (
    <div className="bg-[#151515] border border-gray-800 rounded-2xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-white text-2xl font-bold">
            Total Visitors
          </h2>
          <p className="text-gray-400">
            Total for the last 3 months
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white text-black px-4 py-2 rounded-xl">
            Last 3 months
          </button>

          <button className="border border-gray-700 px-4 py-2 rounded-xl text-white">
            Last 30 days
          </button>

          <button className="border border-gray-700 px-4 py-2 rounded-xl text-white">
            Last 7 days
          </button>
        </div>
      </div>

      <div className="h-72 bg-[#1f1f1f] rounded-xl flex items-center justify-center text-gray-500">
        Chart Here
      </div>
    </div>
  );
}
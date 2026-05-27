import { title } from "process";

interface IStatData {
  title: string
  value: string
  growth: string
  subtitle: string
}

export default function StatCard({title,value, growth,subtitle}: IStatData) {
  return (
    <div className="bg-[#151515] border border-gray-800 rounded-2xl p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-gray-400">{title}</h3>

        <span className="text-green-400 text-sm">
          {growth}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-white mb-4">
        {value}
      </h1>

      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
// components/ReportsTable.jsx

export default function ReportsTable() {
  const reports = [
    {
      name: "Revenue Report",
      status: "Completed",
      date: "12 May",
    },
    {
      name: "Visitors Analytics",
      status: "Pending",
      date: "15 May",
    },
  ];

  return (
    <div className="bg-[#151515] border border-gray-800 rounded-2xl p-6 mt-6">
      <h2 className="text-2xl text-white font-bold mb-6">
        Recent Reports
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 border-b border-gray-800">
            <th className="pb-4">Name</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item, i) => (
            <tr
              key={i}
              className="border-b border-gray-800"
            >
              <td className="py-4 text-white">{item.name}</td>
              <td>{item.status}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
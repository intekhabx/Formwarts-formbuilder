// pages/Dashboard.jsx

import ReportsTable from "~/components/DashBoard/ReportsTable";
import Sidebar from "~/components/DashBoard/Sidebar";
import StatCard from "~/components/DashBoard/StatCard";
import Topbar from "~/components/DashBoard/Topbar";
import VisitorsChart from "~/components/DashBoard/VisitorChart";


export default function Dashboard() {
  return (
    <div className="flex bg-black min-h-screen">

      <div className="flex-1 p-8">

        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$1,250"
            growth="+12.5%"
            subtitle="Trending up this month"
          />

          <StatCard
            title="New Customers"
            value="1,234"
            growth="-20%"
            subtitle="Needs attention"
          />

          <StatCard
            title="Active Accounts"
            value="45,678"
            growth="+12.5%"
            subtitle="Strong user retention"
          />

          <StatCard
            title="Growth Rate"
            value="4.5%"
            growth="+4.5%"
            subtitle="Steady performance increase"
          />
        </div>

        <VisitorsChart />

        <ReportsTable />
      </div>
    </div>
  );
}
import Sidebar from "~/components/DashBoard/Sidebar";
import Topbar from "~/components/DashBoard/Topbar";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-[#070707] text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <div className="sticky top-0 z-50">
          <Topbar />
        </div>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
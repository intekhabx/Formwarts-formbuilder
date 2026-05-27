// components/Sidebar.tsx

import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  FileText,
  Database,
  Shapes,
  PencilRuler,
  Settings,
  LogOut,
  PlusCircle,
  Eye,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface ISidebarData {
  text: string;
  href: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  return (
    <div className="w-72 h-screen bg-[#0d0d0d] border-r border-gray-800 flex flex-col justify-between p-5">
      
      {/* TOP SECTION */}
      <div>
        {/* LOGO */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            FormWarts
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Smart Form Builder
          </p>
        </div>

        {/* CREATE BUTTON */}
        <button className="w-full bg-white text-black rounded-2xl py-3 mb-8 font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition">
          <PlusCircle size={18} />
          Create New Form
        </button>

        {/* MAIN MENU */}
        <div className="mb-8">
          <p className="text-gray-500 text-xs uppercase mb-4">
            Main
          </p>

          <nav className="space-y-2">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              text="Dashboard"
              href="/dashboard"
            />

            <SidebarItem
              icon={<Shapes size={18} />}
              text="Forms"
              href="/dashboard/form"
            />

            {/* <SidebarItem
              icon={<PencilRuler size={18} />}
              text="Templates"
            />

            <SidebarItem
              icon={<FolderKanban size={18} />}
              text="Projects"
            /> */}
          </nav>
        </div>

        {/* TEAM */}
        <div className="mb-8">
          <p className="text-gray-500 text-xs uppercase mb-4">
            Workspace
          </p>

          <nav className="space-y-2">
            <SidebarItem
              icon={<Settings size={18} />}
              text="Settings"
              href="/dashboard/setting"
            />
          </nav>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-800 pt-5">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function SidebarItem({icon, text, href}: ISidebarData) {
  return (
    <Link href={href} className="flex items-center gap-3 hover:bg-[#1a1a1a] p-3 rounded-xl cursor-pointer transition text-gray-300 hover:text-white">
      {icon}

      <span className="font-medium">
        {text}
      </span>
    </Link>
  );
}
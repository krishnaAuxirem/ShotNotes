import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials } from "@/lib/utils";
import {
  LayoutDashboard, FileText, Mic, Image, Bell, BarChart2, User, Bot, Users,
  PenLine, Settings, LogOut, ShieldAlert, Tag, Search, Share2, CreditCard, Shield, Hash,
} from "lucide-react";

const USER_LINKS = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/dashboard/notes", icon: FileText, label: "All Notes" },
  { to: "/dashboard/voice", icon: Mic, label: "Voice Notes" },
  { to: "/dashboard/images", icon: Image, label: "Image Notes" },
  { to: "/dashboard/tags", icon: Tag, label: "Tags" },
  { to: "/dashboard/search", icon: Search, label: "Search" },
  { to: "/dashboard/shared", icon: Share2, label: "Shared Notes" },
  { to: "/dashboard/reminders", icon: Bell, label: "Reminders" },
  { to: "/dashboard/activity", icon: BarChart2, label: "Activity" },
  { to: "/dashboard/profile", icon: User, label: "Profile" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  { to: "/ai-insights", icon: Bot, label: "AI Insights", badge: "New" },
];

const ADMIN_LINKS = [
  { to: "/admin", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/notes", icon: FileText, label: "All Notes" },
  { to: "/admin/blog", icon: PenLine, label: "Blog Manager" },
  { to: "/admin/analytics", icon: BarChart2, label: "Analytics" },
  { to: "/admin/revenue", icon: CreditCard, label: "Revenue" },
  { to: "/admin/roles", icon: Shield, label: "Roles & Perms" },
  { to: "/admin/notifications", icon: Bell, label: "Notifications" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";
  const links = isAdmin ? ADMIN_LINKS : USER_LINKS;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ background: "#0D1525", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-dark-navy font-bold text-sm" style={{ background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" }}>
              SN
            </div>
            <span className="font-display font-bold text-white">ShotNotes</span>
          </NavLink>
          {isAdmin && (
            <div className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit flex items-center gap-1" style={{ background: "rgba(255,86,86,0.2)", color: "#FF5656" }}>
              <ShieldAlert className="w-3 h-3" /> ADMIN
            </div>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin">
          {!isAdmin && (
            <div className="mb-2">
              <div className="text-[10px] font-semibold text-slate-600 uppercase px-3 mb-1">Notes</div>
            </div>
          )}
          <div className="space-y-0.5">
            {links.map((link, i) => {
              const Icon = link.icon;
              const isSection = !isAdmin && (link.to === "/dashboard/reminders" || link.to === "/ai-insights");
              return (
                <div key={link.to}>
                  {isSection && !isAdmin && (
                    <div className="text-[10px] font-semibold text-slate-600 uppercase px-3 mt-3 mb-1">
                      {link.to === "/dashboard/reminders" ? "Tools" : "AI"}
                    </div>
                  )}
                  <NavLink
                    to={link.to}
                    end={"end" in link ? link.end : false}
                    onClick={onClose}
                    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{link.label}</span>
                    {"badge" in link && link.badge && (
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-sky-blue/20 text-sky-blue">{link.badge}</span>
                    )}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl glass-card mb-3">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-blue to-light-yellow flex items-center justify-center text-dark-navy text-xs font-bold">
                {getInitials(user?.name || "U")}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user?.name}</div>
              <div className="text-xs text-slate-400 capitalize">{user?.plan} plan</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-coral-red hover:bg-coral-red/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

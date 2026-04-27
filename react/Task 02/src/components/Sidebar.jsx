import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`
        relative flex flex-col h-screen sticky top-0
        bg-sidebar border-r border-sidebar-border
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-[260px]"}
      `}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        {!collapsed && (
          <span className="font-heading text-lg font-semibold text-sidebar-foreground tracking-tight truncate">
            NightOwl
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive =
            location.pathname === to || location.pathname.startsWith(to + "/");

          const link = (
            <NavLink
              key={to}
              to={to}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 relative overflow-hidden
                ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "drop-shadow-sm" : ""
                }`}
              />
              {!collapsed && <span className="truncate">{label}</span>}

              {/* Active indicator glow */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-sidebar-primary/20 blur-xl -z-10" />
              )}
            </NavLink>
          );

          if (collapsed) {
            return (
              <Tooltip key={to} delayDuration={0}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={12}>
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return link;
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar-accent/50 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Sun
            className={`w-4 h-4 shrink-0 transition-colors ${
              theme === "light"
                ? "text-amber-500"
                : "text-sidebar-foreground/40"
            }`}
          />
          {!collapsed && (
            <>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-sidebar-primary"
                id="theme-toggle"
              />
              <Moon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  theme === "dark"
                    ? "text-indigo-400"
                    : "text-sidebar-foreground/40"
                }`}
              />
            </>
          )}
          {collapsed && (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleTheme}
                  className="absolute inset-0"
                  aria-label="Toggle theme"
                />
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={12}>
                Switch to {theme === "dark" ? "Light" : "Dark"} Mode
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 shadow-sm z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  );
}

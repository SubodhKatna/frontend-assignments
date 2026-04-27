import { Outlet, NavLink, useParams } from "react-router-dom";
import { users } from "@/data/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";

const statusColors = {
  active: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-zinc-400 dark:bg-zinc-600",
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const { userId } = useParams();

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
          Users
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and view team member profiles.
        </p>
      </div>

      <div className="flex gap-6 min-h-[calc(100vh-12rem)]">
        {/* User List Panel */}
        <div
          className={`${
            userId ? "hidden lg:block" : ""
          } w-full lg:w-[340px] shrink-0 space-y-3`}
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              id="user-search"
            />
          </div>

          {/* User Cards */}
          <div className="space-y-1.5 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
            {filteredUsers.map((user) => (
              <NavLink
                key={user.id}
                to={`/users/${user.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? "bg-primary/10 border border-primary/30 shadow-sm"
                      : "hover:bg-muted/50 border border-transparent"
                  }`
                }
              >
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-border group-hover:border-primary/30 transition-colors">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${statusColors[user.status]}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.role}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 shrink-0"
                >
                  {user.department}
                </Badge>
              </NavLink>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No users found matching "{search}"
              </div>
            )}
          </div>
        </div>

        {/* User Detail Outlet */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

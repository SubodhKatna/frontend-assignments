import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { users } from "@/data/users";
import {
  Users,
  FolderKanban,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: users.length.toString(),
    change: "+12%",
    icon: Users,
    color: "from-indigo-500 to-purple-600",
    darkColor: "dark:from-indigo-400 dark:to-cyan-400",
  },
  {
    title: "Active Projects",
    value: users.reduce((sum, u) => sum + u.projects, 0).toString(),
    change: "+8%",
    icon: FolderKanban,
    color: "from-emerald-500 to-teal-600",
    darkColor: "dark:from-emerald-400 dark:to-green-400",
  },
  {
    title: "Tasks Completed",
    value: users.reduce((sum, u) => sum + u.tasks, 0).toString(),
    change: "+24%",
    icon: CheckCircle2,
    color: "from-amber-500 to-orange-600",
    darkColor: "dark:from-amber-400 dark:to-yellow-400",
  },
  {
    title: "Avg. Completion",
    value:
      Math.round(
        users.reduce((sum, u) => sum + u.completionRate, 0) / users.length
      ) + "%",
    change: "+3%",
    icon: TrendingUp,
    color: "from-rose-500 to-pink-600",
    darkColor: "dark:from-rose-400 dark:to-pink-400",
  },
];

export default function Dashboard() {
  const activeUsers = users.filter((u) => u.status === "active").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your team.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="group relative overflow-hidden border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} ${stat.darkColor} shadow-sm`}
                >
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-heading font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-500">
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
              {/* Subtle gradient overlay on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${stat.color} ${stat.darkColor} transition-opacity duration-300 pointer-events-none`}
              />
            </Card>
          );
        })}
      </div>

      {/* Activity Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest team updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {users.slice(0, 4).map((user, i) => (
              <div key={user.id} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i % 2 === 0
                      ? "bg-primary/15 text-primary"
                      : "bg-accent/15 text-accent"
                  }`}
                >
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Completed {user.tasks} tasks across {user.projects} projects
                  </p>
                </div>
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
                  className="text-xs shrink-0"
                >
                  {user.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Team Overview
            </CardTitle>
            <CardDescription>Department breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Engineering", "Design", "Analytics", "Infrastructure"].map(
              (dept) => {
                const count = users.filter(
                  (u) => u.department === dept
                ).length;
                const percentage = Math.round((count / users.length) * 100);
                return (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {dept}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {count} {count === 1 ? "member" : "members"}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

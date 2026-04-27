import { useParams, Navigate } from "react-router-dom";
import { users } from "@/data/users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Briefcase,
  CheckCircle2,
  FolderKanban,
  TrendingUp,
} from "lucide-react";

const statusColors = {
  active: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-zinc-400 dark:bg-zinc-600",
};

export default function UserDetail() {
  const { userId } = useParams();
  const user = users.find((u) => u.id === parseInt(userId));

  if (!user) return <Navigate to="/users" replace />;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Profile Header Card */}
      <Card className="border-border/50 overflow-hidden mb-6">
        <div className="h-24 bg-gradient-to-r from-primary/80 to-accent/80" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-end -mt-10 mb-6">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 border-4 border-card bg-card shadow-sm">
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-card ${
                  statusColors[user.status]
                }`}
              />
            </div>
            <div className="flex-1 pb-1">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {user.name}
              </h2>
              <p className="text-muted-foreground font-medium">@{user.username}</p>
            </div>
            <div className="pb-1">
              <Badge variant="secondary" className="px-3 py-1">
                {user.role}
              </Badge>
            </div>
          </div>

          <p className="text-foreground/90 max-w-3xl leading-relaxed mb-6">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="bg-muted/50">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Contact Info Sidebar */}
        <Card className="border-border/50 md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-heading">Contact & Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">{user.location}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">{user.department}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">Joined {user.joinDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-heading font-semibold text-foreground px-1">
            Performance
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-border/50 bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <FolderKanban className="w-6 h-6 text-primary" />
                <div className="text-2xl font-bold text-foreground">
                  {user.projects}
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  Projects
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-accent/5 border-accent/20">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-accent" />
                <div className="text-2xl font-bold text-foreground">
                  {user.tasks}
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  Tasks Done
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-emerald-500/5 border-emerald-500/20">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
                <div className="text-2xl font-bold text-foreground">
                  {user.completionRate}%
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  Success Rate
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Monitor, Bell, Lock, UserCog } from "lucide-react";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your app preferences and configurations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-heading">
              <Monitor className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how the application looks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Theme Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch between Light and Night Owl Dark mode.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Sun
                  className={`w-4 h-4 ${
                    theme === "light" ? "text-amber-500" : "text-muted-foreground"
                  }`}
                />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon
                  className={`w-4 h-4 ${
                    theme === "dark" ? "text-indigo-400" : "text-muted-foreground"
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications (Placeholder) */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-heading">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Manage how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Email Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Receive daily summary emails.
                </p>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when a task is completed.
                </p>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Account (Placeholder) */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-heading">
              <UserCog className="w-5 h-5 text-primary" />
              Account Preferences
            </CardTitle>
            <CardDescription>Manage your profile and security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <Switch className="data-[state=checked]:bg-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

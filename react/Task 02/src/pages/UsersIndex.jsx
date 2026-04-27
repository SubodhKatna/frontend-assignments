import { Users } from "lucide-react";

export default function UsersIndex() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center space-y-4 animate-in fade-in duration-700">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Select a User
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            Choose a team member from the list to view their detailed profile
            and activity.
          </p>
        </div>
      </div>
    </div>
  );
}

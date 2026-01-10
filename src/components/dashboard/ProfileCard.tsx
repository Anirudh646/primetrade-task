import { useState } from "react";
import { Profile, useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, User, Mail, Calendar, Pencil, X, Check } from "lucide-react";
import { format } from "date-fns";

export function ProfileCard() {
  const { user } = useAuth();
  const { profile, isLoading, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleEdit = () => {
    setFullName(profile?.full_name || "");
    setEditing(true);
  };

  const handleSave = () => {
    updateProfile.mutate({ full_name: fullName.trim() });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Profile</CardTitle>
        {!editing && (
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {getInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="sr-only">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="input-focus-ring"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={updateProfile.isPending}>
                    {updateProfile.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg truncate">
                  {profile?.full_name || "No name set"}
                </h3>
                <p className="text-sm text-muted-foreground">Member</p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Joined {profile?.created_at ? format(new Date(profile.created_at), "MMMM yyyy") : "N/A"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

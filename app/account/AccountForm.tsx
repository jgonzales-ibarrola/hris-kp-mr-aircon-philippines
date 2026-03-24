"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertCircle,
  CheckCircle2,
  Globe,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Toast = { type: "success" | "error"; message: string } | null;

const AccountForm = ({ user }: { user: User | null }) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select("full_name, username, website, avatar_url")
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch {
      showToast("error", "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    try {
      setSaving(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      showToast("success", "Profile updated successfully.");
    } catch {
      showToast("error", "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  // Derive initials for avatar fallback
  const initials = fullname
    ? fullname.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-[#080a10] flex items-start justify-center px-4 py-12">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-100 w-100 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Toast */}
      {toast && (
        <div
          className={cn(
            "fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300",
            toast.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          )}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          {toast.message}
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* ── Header ── */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-white/[0.07] ring-2 ring-primary/20">
              <AvatarImage src={avatar_url ?? undefined} alt={fullname ?? "User"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {loading ? "…" : initials}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-primary/20 text-primary">
              <Pencil className="h-2.5 w-2.5" />
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight">
              {loading ? "Loading…" : fullname ?? "Your Profile"}
            </h1>
            <p className="mt-0.5 text-sm text-zinc-500">{user?.email}</p>
          </div>
        </div>

        {/* ── Form card ── */}
        <div className="rounded-2xl border border-white/6 bg-white/3 shadow-2xl shadow-black/40 backdrop-blur-sm overflow-hidden">

          {/* Card header bar */}
          <div className="flex items-center gap-2 border-b border-white/6 px-6 py-4">
            <UserIcon className="h-4 w-4 text-primary/70" />
            <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Account Information
            </span>
          </div>

          <div className="p-6 space-y-5">

            {/* Email — read only */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[11px] font-medium uppercase tracking-widest text-zinc-500"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-700" />
                <Input
                  id="email"
                  type="text"
                  value={user?.email ?? ""}
                  disabled
                  className="h-11 cursor-not-allowed border-white/5 bg-white/2 pl-10 text-sm text-zinc-600 rounded-xl opacity-60"
                />
              </div>
            </div>

            {/* Full name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="fullName"
                className="text-[11px] font-medium uppercase tracking-widest text-zinc-500"
              >
                Full Name
              </Label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullname ?? ""}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="John Doe"
                  disabled={loading}
                  className="h-11 border-white/[0.07] bg-white/4 pl-10 text-sm text-zinc-100 placeholder:text-zinc-700 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0 rounded-xl transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-[11px] font-medium uppercase tracking-widest text-zinc-500"
              >
                Username
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-700 select-none">
                  @
                </span>
                <Input
                  id="username"
                  type="text"
                  value={username ?? ""}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  disabled={loading}
                  className="h-11 border-white/[0.07] bg-white/4 pl-8 text-sm text-zinc-100 placeholder:text-zinc-700 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0 rounded-xl transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Website */}
            <div className="space-y-1.5">
              <Label
                htmlFor="website"
                className="text-[11px] font-medium uppercase tracking-widest text-zinc-500"
              >
                Website
              </Label>
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <Input
                  id="website"
                  type="url"
                  value={website ?? ""}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yoursite.com"
                  disabled={loading}
                  className="h-11 border-white/[0.07] bg-white/4 pl-10 text-sm text-zinc-100 placeholder:text-zinc-700 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:ring-offset-0 rounded-xl transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Save button */}
            <Button
              onClick={updateProfile}
              disabled={loading || saving}
              className="h-11 w-full rounded-xl bg-primary text-primary-foreground text-sm font-medium tracking-wide shadow-lg shadow-primary/20 transition-all hover:brightness-110 hover:-translate-y-px hover:shadow-xl hover:shadow-primary/30 disabled:pointer-events-none disabled:opacity-40"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>

          {/* Divider */}
          <Separator className="bg-white/5" />

          {/* Sign out */}
          <div className="px-6 py-4">
            <form action="/auth/signout" method="post">
              <Button
                type="submit"
                variant="ghost"
                className="h-10 w-full rounded-xl text-sm text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-white tracking-wide">
          Changes are saved to your workspace profile.
        </p>
      </div>
    </div>
  );
};

export default AccountForm;
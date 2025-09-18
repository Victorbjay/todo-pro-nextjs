"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const doSignOut = async () => {
      await supabase.auth.signOut();
      router.replace("/login"); // redirect to login
    };
    doSignOut();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Signing out...</p>
    </main>
  );
}

// "use client";

// import LoginForm from "@/components/LoginForm";

// export default function LoginPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[70vh]">
//       <h1 className="text-2xl font-bold mb-6">Login</h1>
//       <LoginForm />
//     </div>
//   );
// }
// src/app/login/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) router.replace("/");
    };
    check();
    // listen for auth change to redirect after magic link
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) router.replace("/");
      }
    );
    return () => listener.subscription.unsubscribe();
  }, [router]);

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <LoginForm />
    </div>
  );
}

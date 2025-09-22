"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-lg font-bold">
          Todo Pro
        </Link>
        {user && (
          <Link href="/todos">
            <span className="text-sm text-gray-600 hover:underline">Todos</span>
          </Link>
        )}
      </div>

      <div>
        {!user ? (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

// "use client";
// import Link from "next/link";
// import { Button } from "./ui/button";

// export default function Header() {
//   return (
//     <header className="flex items-center justify-between p-4 border-b">
//       <Link href="/todos" className="text-xl font-bold">
//         My Todos
//       </Link>
//       <nav className="flex items-center gap-4">
//         <Link href="/todos/new">
//           <Button size="sm">New Todo</Button>
//         </Link>
//         {/* Logout now just navigates to /auth/sign-out */}
//         <Link href="/auth/sign-out">
//           <Button size="sm" variant="outline">
//             Logout
//           </Button>
//         </Link>
//       </nav>
//     </header>
//   );
// }

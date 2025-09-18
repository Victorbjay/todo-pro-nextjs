// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       router.push("/");
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       router.push("/");
//     }
//   };

//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
//         <h1 className="text-2xl font-bold">Login / Sign Up</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <div className="flex gap-2">
//           <Button type="submit" className="flex-1">
//             Login
//           </Button>
//           <Button type="button" onClick={handleSignup} className="flex-1">
//             Sign Up
//           </Button>
//         </div>
//       </form>
//     </main>
//   );
// }
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TodoList from "@/components/TodoList";

export default function TodosPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      }
      setLoading(false);
    };
    check();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Todos</h1>
        <Link href="/todos/new">
          <button className="px-3 py-2 rounded bg-indigo-600 text-white">
            New
          </button>
        </Link>
      </div>

      <TodoList />
    </div>
  );
}

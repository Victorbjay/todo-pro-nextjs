// // "use client";

// // import { useEffect, useState } from "react";
// // import { supabase } from "@/lib/supabase";
// // import { useRouter } from "next/navigation";
// // import TodoList from "@/components/TodoList";

// // export default function Home() {
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState<any>(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     async function getUser() {
// //       const { data } = await supabase.auth.getUser();
// //       if (data?.user) setUser(data.user);
// //       setLoading(false);
// //     }
// //     getUser();
// //   }, []);

// //   if (loading) return <p>Loading...</p>;
// //   if (!user) {
// //     router.push("/login");
// //     return <p>Redirecting to login...</p>;
// //   }

// //   return <TodoList user={user} />;
// // }
// import TodoList from "@/components/TodoList";

// export default function Home() {
//   return (
//     <main className="min-h-screen flex items-center justify-center">
//       <TodoList />
//     </main>
//   );
// }
// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TodoList from "@/components/TodoList";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    check();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.replace("/login");
        else setUser(session.user);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.email}</h1>
      <TodoList />
    </div>
  );
}

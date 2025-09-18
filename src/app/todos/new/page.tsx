// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase"
// import TodoForm from "@/components/TodoForm"

// export default function NewTodoPage() {
//   const [loading, setLoading] = useState(true)
//   const [user, setUser] = useState<any>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: { session } } = await supabase.auth.getSession()
//       if (!session) {
//         router.push("/login")
//       } else {
//         setUser(session.user)
//       }
//       setLoading(false)
//     }

//     getUser()

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         if (!session) {
//           router.push("/login")
//         } else {
//           setUser(session.user)
//         }
//       }
//     )

//     return () => {
//       subscription.unsubscribe()
//     }
//   }, [router])

//   if (loading) return <p className="p-4">Loading...</p>

//   return (
//     <div className="p-8 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Add New Todo</h1>
//       <TodoForm user={user} />
//     </div>
//   )
// }
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TodoForm from "@/components/TodoForm";

export default function NewTodoPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.replace("/login");
      setLoading(false);
    };
    check();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Todo</h1>
      <TodoForm onAdded={() => router.push("/")} />
    </div>
  );
}

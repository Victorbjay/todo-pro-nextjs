// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { Button } from "@/components/ui/button";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();
//     const { error } = await supabase.auth.signInWithOtp({ email });
//     if (error) setMessage(error.message);
//     else setMessage("Check your email for the login link!");
//   }

//   return (
//     <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//         className="border px-3 py-2 rounded w-full"
//         required
//       />
//       <Button type="submit" className="w-full">
//         Send Magic Link
//       </Button>
//       {message && <p className="text-sm text-gray-600">{message}</p>}
//     </form>
//   );
// }
// src/components/LoginForm.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email for a login link.");

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4">
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send Magic Link"}
      </Button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  );
}

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { supabase } from "@/lib/supabase";
// import { Button } from "./ui/button";
// import { Todo } from "@/types/todo";

// export default function TodoItem({
//   todo,
//   onUpdated,
//   onDeleted,
// }: {
//   todo: Todo;
//   onUpdated?: (t: Todo) => void;
//   onDeleted?: (id: string) => void;
// }) {
//   const [loading, setLoading] = useState(false);

//   const toggle = async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("todos")
//       .update({ completed: !todo.completed })
//       .eq("id", todo.id)
//       .select();
//     setLoading(false);
//     if (error) return alert(error.message);
//     if (data?.[0]) onUpdated?.(data[0] as Todo);
//   };

//   const del = async () => {
//     if (!confirm("Delete this todo?")) return;
//     setLoading(true);
//     const { error } = await supabase.from("todos").delete().eq("id", todo.id);
//     setLoading(false);
//     if (error) return alert(error.message);
//     onDeleted?.(todo.id);
//   };

//   return (
//     <li className="flex items-center justify-between gap-4 border p-3 rounded">
//       <div>
//         {/* Title links to detail page */}
//         <Link
//           href={`/todos/${todo.id}`}
//           className={`block font-medium hover:underline ${
//             todo.completed ? "line-through text-gray-500" : ""
//           }`}
//         >
//           {todo.title}
//         </Link>
//         <div className="text-xs text-gray-400">
//           {new Date(
//             todo.inserted_at ?? todo.created_at ?? Date.now().toString()
//           ).toLocaleString()}
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         <Button size="sm" variant="outline" onClick={toggle} disabled={loading}>
//           {todo.completed ? "Undo" : "Done"}
//         </Button>
//         <Link href={`/todos/${todo.id}/edit`}>
//           <Button size="sm">Edit</Button>
//         </Link>
//         <Button
//           size="sm"
//           variant="destructive"
//           onClick={del}
//           disabled={loading}
//         >
//           Delete
//         </Button>
//       </div>
//     </li>
//   );
// }
"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Todo } from "@/types/todo";
import { CheckCircle } from "lucide-react"; // ✅ nice checkmark icon
import { motion, AnimatePresence } from "framer-motion"; // ✅ animation

export default function TodoItem({
  todo,
  onUpdated,
  onDeleted,
}: {
  todo: Todo;
  onUpdated?: (t: Todo) => void;
  onDeleted?: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", todo.id)
      .select();
    setLoading(false);
    if (error) return alert(error.message);
    if (data?.[0]) onUpdated?.(data[0] as Todo);
  };

  const del = async () => {
    if (!confirm("Delete this todo?")) return;
    setLoading(true);
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);
    setLoading(false);
    if (error) return alert(error.message);
    onDeleted?.(todo.id);
  };

  return (
    <li
      className={`flex items-center justify-between gap-4 border p-3 rounded transition-colors duration-300 ${
        todo.completed ? "bg-green-50" : "bg-white"
      }`}
    >
      <div>
        {/* Title links to detail page */}
        <Link
          href={`/todos/${todo.id}`}
          className={`block font-medium hover:underline ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.title}
        </Link>
        <div className="text-xs text-gray-400">
          {new Date(
            todo.inserted_at ?? todo.created_at ?? Date.now().toString()
          ).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={toggle} disabled={loading}>
          {todo.completed ? "Undo" : "Done"}
        </Button>

        {/* ✅ Show animated checkmark when completed */}
        <AnimatePresence>
          {todo.completed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <CheckCircle className="text-green-500 w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        <Link href={`/todos/${todo.id}/edit`}>
          <Button size="sm">Edit</Button>
        </Link>
        <Button
          size="sm"
          variant="destructive"
          onClick={del}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}

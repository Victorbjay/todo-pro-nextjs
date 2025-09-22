"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";

export default function TodoDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: todo, error } = await supabase
        .from("todos")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        alert(error.message);
        router.push("/todos");
        return;
      }
      setTodo(todo as Todo);
      setLoading(false);
    };
    load();
  }, [id, router]);

  if (loading) return <p>Loading...</p>;
  if (!todo) return <p>Todo not found.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Todo Details</h1>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(todo.inserted_at ?? todo.created_at ?? "").toLocaleString()}
      </p>
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => router.push(`/todos/${id}/edit`)}
        >
          Edit
        </Button>
        <Button onClick={() => router.push("/todos")}>Back</Button>
      </div>
    </div>
  );
}

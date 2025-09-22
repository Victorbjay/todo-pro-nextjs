// src/app/todos/[id]/edit/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";

export default function EditTodoPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login");
        return;
      }
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
      setTitle(todo.title);
      setCompleted(todo.completed);
      setLoading(false);
    };
    load();
  }, [id, router]);

  const save = async () => {
    const { error } = await supabase
      .from("todos")
      .update({ title, completed })
      .eq("id", id);
    if (error) return alert(error.message);
    router.push("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <div className="space-y-4 max-w-md">
        <Input
          value={title}
          onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) =>
              setCompleted((e.target as HTMLInputElement).checked)
            }
          />
          <span>Completed</span>
        </div>
        <div className="flex gap-2">
          <Button onClick={save}>Save</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

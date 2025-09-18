"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Todo } from "@/types/todo";

export default function TodoForm({ onAdded }: { onAdded?: (t: Todo) => void }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if (!title.trim()) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title }])
      .select();
    setLoading(false);
    if (error) return alert(error.message);
    setTitle("");
    if (data?.[0] && onAdded) onAdded(data[0] as Todo);
  };

  return (
    <div className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
      />
      <Button onClick={add} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </Button>
    </div>
  );
}

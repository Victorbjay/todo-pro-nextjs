"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const limit = 10;

  const fetch = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("todos").select("*", { count: "exact" });

    if (search.trim()) {
      query = query.ilike("title", `%${search.trim()}%`);
    }
    if (filter === "completed") {
      query = query.eq("completed", true);
    } else if (filter === "pending") {
      query = query.eq("completed", false);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order("inserted_at", { ascending: false })
      .range(from, to);

    setLoading(false);
    if (error) return alert(error.message);
    setTodos((data ?? []) as Todo[]);
    setTotal(count ?? 0);
  }, [page, search, filter]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const onUpdated = (todo: Todo) => {
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
  };

  const onDeleted = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "completed" | "pending")
          }
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <Button onClick={() => fetch()}>Apply</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdated={onUpdated}
              onDeleted={onDeleted}
            />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

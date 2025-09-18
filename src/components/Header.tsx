"use client";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link href="/todos" className="text-xl font-bold">
        My Todos
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/todos/new">
          <Button size="sm">New Todo</Button>
        </Link>
        {/* Logout now just navigates to /auth/sign-out */}
        <Link href="/auth/sign-out">
          <Button size="sm" variant="outline">
            Logout
          </Button>
        </Link>
      </nav>
    </header>
  );
}

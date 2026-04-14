"use client";

import { useState } from "react";
import { useLogin } from "@/src/hooks/useAuth";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-10 max-w-sm mx-auto">
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" isLoading={isPending}>
        Login
      </Button>
    </form>
  );
}

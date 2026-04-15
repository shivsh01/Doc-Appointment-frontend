"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/src/hooks/useAuth";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import styles from "./AuthForm.module.css";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginUser, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  const errorMessage =
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || (error ? "Login failed. Please try again." : null);

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.heading}>Welcome back</h2>
        <p className={styles.subheading}>
          Sign in to manage your appointments
        </p>
      </div>

      {errorMessage && (
        <div className={styles.errorBanner}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Button type="submit" isLoading={isPending} fullWidth size="lg">
          Sign In
        </Button>
      </form>

      <p className={styles.footer}>
        Don&apos;t have an account?{" "}
        <Link href="/register" className={styles.footerLink}>
          Create one
        </Link>
      </p>
    </>
  );
}

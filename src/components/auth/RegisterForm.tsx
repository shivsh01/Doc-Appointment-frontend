"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegister } from "@/src/hooks/useAuth";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Role } from "@/src/types/auth.type";
import styles from "./AuthForm.module.css";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>(Role.PATIENT);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutate: registerUser, isPending, error } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    registerUser({ name, email, password, role });
  };

  const serverError =
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || (error ? "Registration failed. Please try again." : null);

  const displayError = validationError || serverError;

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.heading}>Create your account</h2>
        <p className={styles.subheading}>
          Start managing your health journey today
        </p>
      </div>

      {displayError && (
        <div className={styles.errorBanner}>{displayError}</div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />

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
          autoComplete="new-password"
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        {/* Role selector */}
        <div className={styles.form}>
          <label className={styles.subheading} style={{ textAlign: "left" }}>
            I am a
          </label>
          <div style={{ display: "flex", gap: "var(--space-md)" }}>
            <Button
              type="button"
              variant={role === Role.PATIENT ? "primary" : "outline"}
              size="md"
              fullWidth
              onClick={() => setRole(Role.PATIENT)}
            >
              🧑 Patient
            </Button>
            <Button
              type="button"
              variant={role === Role.DOCTOR ? "primary" : "outline"}
              size="md"
              fullWidth
              onClick={() => setRole(Role.DOCTOR)}
            >
              👨‍⚕️ Doctor
            </Button>
          </div>
        </div>

        <Button type="submit" isLoading={isPending} fullWidth size="lg">
          Create Account
        </Button>
      </form>

      <p className={styles.footer}>
        Already have an account?{" "}
        <Link href="/login" className={styles.footerLink}>
          Sign in
        </Link>
      </p>
    </>
  );
}

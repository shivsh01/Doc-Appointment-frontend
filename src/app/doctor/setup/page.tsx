"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateDoctorProfile } from "@/src/hooks/useDoctor";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import pageStyles from "@/src/components/shared/PageStyles.module.css";
import formStyles from "@/src/components/auth/AuthForm.module.css";

const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Orthopedist",
  "Pediatrician",
  "Neurologist",
  "Psychiatrist",
  "ENT Specialist",
  "Ophthalmologist",
  "Gynecologist",
];

export default function DoctorSetupPage() {
  const router = useRouter();
  const { mutate: createProfile, isPending, error, isSuccess } = useCreateDoctorProfile();

  const [form, setForm] = useState({
    specialization: SPECIALIZATIONS[0],
    experience: 1,
    consultationFee: 500,
    startTime: "09:00",
    endTime: "17:00",
    slotDuration: 30,
    maxBookingsPerDay: 20,
    paymentRequired: false,
  });

  const update = (key: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile(form, {
      onSuccess: () => {
        setTimeout(() => router.push("/doctor/dashboard"), 1500);
      },
    });
  };

  const serverError =
    (error as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || (error ? "Failed to create profile." : null);

  return (
    <>
      <div className={pageStyles.pageHeader}>
        <h1 className={pageStyles.pageTitle}>Setup Your Doctor Profile</h1>
      </div>

      <Card padding="lg" style={{ maxWidth: 600 }}>
        {isSuccess && (
          <div className={pageStyles.successBanner}>
            ✅ Profile created! Redirecting to dashboard…
          </div>
        )}

        {serverError && (
          <div className={formStyles.errorBanner}>{serverError}</div>
        )}

        <form onSubmit={handleSubmit} className={formStyles.form}>
          {/* Specialization */}
          <div className={formStyles.form} style={{ gap: "var(--space-xs)" }}>
            <label className={formStyles.subheading} style={{ textAlign: "left", fontWeight: 500, color: "var(--color-text)" }}>
              Specialization
            </label>
            <select
              value={form.specialization}
              onChange={(e) => update("specialization", e.target.value)}
              style={{
                padding: "var(--space-sm) var(--space-md)",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                fontSize: "var(--font-size-base)",
                background: "var(--color-bg-card)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {SPECIALIZATIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <Input
            label="Years of Experience"
            type="number"
            value={form.experience}
            onChange={(e) => update("experience", Number(e.target.value))}
            required
          />

          <Input
            label="Consultation Fee (₹)"
            type="number"
            value={form.consultationFee}
            onChange={(e) => update("consultationFee", Number(e.target.value))}
            required
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
            <Input
              label="Start Time"
              type="time"
              value={form.startTime}
              onChange={(e) => update("startTime", e.target.value)}
              required
            />
            <Input
              label="End Time"
              type="time"
              value={form.endTime}
              onChange={(e) => update("endTime", e.target.value)}
              required
            />
          </div>

          <Input
            label="Slot Duration (minutes)"
            type="number"
            value={form.slotDuration}
            onChange={(e) => update("slotDuration", Number(e.target.value))}
            required
          />

          <Input
            label="Max Bookings Per Day"
            type="number"
            value={form.maxBookingsPerDay}
            onChange={(e) => update("maxBookingsPerDay", Number(e.target.value))}
            required
          />

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
            <input
              type="checkbox"
              id="paymentRequired"
              checked={form.paymentRequired}
              onChange={(e) => update("paymentRequired", e.target.checked)}
              style={{ width: 18, height: 18, accentColor: "var(--color-primary-600)" }}
            />
            <label htmlFor="paymentRequired" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text)" }}>
              Require payment before booking
            </label>
          </div>

          <Button type="submit" isLoading={isPending} fullWidth size="lg" disabled={isSuccess}>
            Create Profile
          </Button>
        </form>
      </Card>
    </>
  );
}

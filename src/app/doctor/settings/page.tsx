"use client";

import { useState, useEffect } from "react";
import { useMyDoctorProfile, useUpdateDoctorProfile } from "@/src/hooks/useDoctor";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Spinner } from "@/src/components/ui/Spinner";
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

export default function DoctorSettingsPage() {
  const { data: profile, isLoading, isError } = useMyDoctorProfile();
  const { mutate: updateProfile, isPending, isSuccess } = useUpdateDoctorProfile();

  const [form, setForm] = useState({
    specialization: SPECIALIZATIONS[0],
    experience: 1,
    consultationFee: 500,
    paymentRequired: false,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        specialization: profile.specialization || SPECIALIZATIONS[0],
        experience: profile.experience || 1,
        consultationFee: profile.consultationFee || 500,
        paymentRequired: profile.paymentRequired || false,
      });
    }
  }, [profile]);

  const update = (key: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
  };

  if (isLoading) return <div className={pageStyles.centered}><Spinner size="lg" /></div>;
  if (isError || !profile) return <div>Failed to load profile settings.</div>;

  return (
    <>
      <div className={pageStyles.pageHeader}>
        <h1 className={pageStyles.pageTitle}>Profile Settings</h1>
      </div>

      <Card padding="lg" style={{ maxWidth: 600 }}>
        {isSuccess && (
          <div className={pageStyles.successBanner} style={{ marginBottom: "1rem" }}>
            ✅ Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className={formStyles.form}>
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

          <Button type="submit" isLoading={isPending} fullWidth size="lg">
            Save Changes
          </Button>
        </form>
      </Card>
    </>
  );
}

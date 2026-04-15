"use client";

import { useState, useEffect } from "react";
import { useMyDoctorProfile, useUpdateDoctorSchedule } from "@/src/hooks/useDoctor";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Spinner } from "@/src/components/ui/Spinner";
import pageStyles from "@/src/components/shared/PageStyles.module.css";
import formStyles from "@/src/components/auth/AuthForm.module.css";

export default function DoctorSchedulePage() {
  const { data: profile, isLoading, isError } = useMyDoctorProfile();
  const { mutate: updateSchedule, isPending, isSuccess } = useUpdateDoctorSchedule();

  const [form, setForm] = useState({
    startTime: "09:00",
    endTime: "17:00",
    slotDuration: 30,
    maxBookingsPerDay: 20,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        startTime: profile.startTime || "09:00",
        endTime: profile.endTime || "17:00",
        slotDuration: profile.slotDuration || 30,
        maxBookingsPerDay: profile.maxBookingsPerDay || 20,
      });
    }
  }, [profile]);

  const update = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchedule(form);
  };

  if (isLoading) return <div className={pageStyles.centered}><Spinner size="lg" /></div>;
  if (isError || !profile) return <div>Failed to load schedule.</div>;

  return (
    <>
      <div className={pageStyles.pageHeader}>
        <h1 className={pageStyles.pageTitle}>Schedule Settings</h1>
      </div>

      <Card padding="lg" style={{ maxWidth: 600 }}>
        {isSuccess && (
          <div className={pageStyles.successBanner} style={{ marginBottom: "1rem" }}>
            ✅ Schedule updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className={formStyles.form}>
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

          <Button type="submit" isLoading={isPending} fullWidth size="lg">
            Save Changes
          </Button>
        </form>
      </Card>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useMyProfile, useUpdateProfile } from "@/src/hooks/useUser";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { Spinner } from "@/src/components/ui/Spinner";
import pageStyles from "@/src/components/shared/PageStyles.module.css";
import formStyles from "@/src/components/auth/AuthForm.module.css";

export default function PatientSettingsPage() {
  const { data: profile, isLoading, isError } = useMyProfile();
  const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const update = (key: string, value: string) => {
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
          <Input
            label="Full Name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />

          <Input
            label="Phone Number"
            type="text"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="e.g. +1234567890"
          />

          <Input
            label="Address"
            type="text"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="e.g. 123 Main St, City"
          />

          <Button type="submit" isLoading={isPending} fullWidth size="lg">
            Save Changes
          </Button>
        </form>
      </Card>
    </>
  );
}

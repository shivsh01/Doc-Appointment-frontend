"use client";

import { DashboardLayout, NavItem } from "@/src/components/layout/DashboardLayout";

const PATIENT_NAV: NavItem[] = [
  { label: "Dashboard",    href: "/patient/dashboard",    icon: "📊" },
  { label: "Appointments",  href: "/patient/appointments", icon: "📅" },
  { label: "Find Doctors",  href: "/patient/doctors",      icon: "🔍" },
  { label: "My Records",    href: "/patient/records",      icon: "📋" },
  { label: "Settings",      href: "/patient/settings",     icon: "⚙️" },
];

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={PATIENT_NAV}>
      {children}
    </DashboardLayout>
  );
}

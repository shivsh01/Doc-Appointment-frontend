"use client";

import { DashboardLayout, NavItem } from "@/src/components/layout/DashboardLayout";

const DOCTOR_NAV: NavItem[] = [
  { label: "Dashboard",     href: "/doctor/dashboard",     icon: "📊" },
  { label: "Appointments",  href: "/doctor/appointments",  icon: "📅" },
  { label: "My Patients",   href: "/doctor/patients",      icon: "🧑‍🤝‍🧑" },
  { label: "Schedule",      href: "/doctor/schedule",      icon: "🕐" },
  { label: "Settings",      href: "/doctor/settings",      icon: "⚙️" },
];

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={DOCTOR_NAV}>
      {children}
    </DashboardLayout>
  );
}

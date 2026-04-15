"use client";

import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Spinner } from "@/src/components/ui/Spinner";
import { AppointmentList } from "@/src/components/shared/AppointmentList";
import { useMyDoctorProfile } from "@/src/hooks/useDoctor";
import { useDoctorAppointments } from "@/src/hooks/useAppointment";
import { useRouter } from "next/navigation";
import dashStyles from "@/src/app/patient/dashboard/Dashboard.module.css";
import pageStyles from "@/src/components/shared/PageStyles.module.css";

export default function DoctorDashboard() {
  const router = useRouter();
  const { data: profile, isLoading: profileLoading, error: profileError } = useMyDoctorProfile();
  const { data: appointmentData, isLoading: appointmentsLoading } = useDoctorAppointments({ limit: 5 });

  if (profileLoading) {
    return (
      <div className={pageStyles.centered}>
        <Spinner size="lg" />
      </div>
    );
  }

  /* Doctor hasn't created a profile yet → prompt setup */
  if (profileError || !profile) {
    return (
      <div className={pageStyles.emptyState}>
        <div className={pageStyles.emptyStateIcon}>👨‍⚕️</div>
        <p className={pageStyles.emptyStateText}>
          You haven&apos;t set up your doctor profile yet.
        </p>
        <div style={{ marginTop: "var(--space-lg)" }}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/doctor/setup")}
          >
            Create Profile
          </Button>
        </div>
      </div>
    );
  }

  const appointments = appointmentData?.appointments ?? [];
  const bookedCount = appointments.filter((a) => a.status === "booked").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;

  const STATS = [
    {
      label: "Upcoming",
      value: appointmentsLoading ? "…" : String(bookedCount),
      icon: "📅",
      variant: "statIconPrimary" as const,
    },
    {
      label: "Completed",
      value: appointmentsLoading ? "…" : String(completedCount),
      icon: "✅",
      variant: "statIconSuccess" as const,
    },
    {
      label: "Fee",
      value: `₹${profile.consultationFee}`,
      icon: "💰",
      variant: "statIconWarning" as const,
    },
    {
      label: "Status",
      value: profile.isApproved ? "Approved" : "Pending",
      icon: profile.isApproved ? "✅" : "⏳",
      variant: "statIconAccent" as const,
    },
  ];

  return (
    <>
      {!profile.isApproved && (
        <div className={pageStyles.errorBanner} style={{ marginBottom: "var(--space-lg)" }}>
          ⏳ Your profile is pending admin approval. You will be visible to patients once approved.
        </div>
      )}

      {/* Stats */}
      <div className={dashStyles.grid}>
        {STATS.map((stat) => (
          <Card key={stat.label} padding="md">
            <div className={dashStyles.statCard}>
              <div className={`${dashStyles.statIcon} ${dashStyles[stat.variant]}`}>
                {stat.icon}
              </div>
              <div className={dashStyles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Schedule info */}
      <section className={dashStyles.section}>
        <h2 className={dashStyles.sectionTitle}>Your Schedule</h2>
        <Card padding="md">
          <div className={pageStyles.doctorMeta}>
            <span className={pageStyles.metaItem}>🏥 {profile.specialization}</span>
            <span className={pageStyles.metaItem}>📋 {profile.experience} yrs experience</span>
            <span className={pageStyles.metaItem}>🕐 {profile.startTime} – {profile.endTime}</span>
            <span className={pageStyles.metaItem}>⏱ {profile.slotDuration} min slots</span>
            <span className={pageStyles.metaItem}>📊 Max {profile.maxBookingsPerDay} bookings/day</span>
            <span className={pageStyles.metaItem}>{profile.paymentRequired ? "💳 Payment Required" : "🆓 Free Consultation"}</span>
          </div>
        </Card>
      </section>

      {/* Recent appointments */}
      <section className={dashStyles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className={dashStyles.sectionTitle}>Recent Appointments</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/doctor/appointments")}
          >
            View All →
          </Button>
        </div>

        {appointmentsLoading ? (
          <div className={pageStyles.centered}>
            <Spinner size="lg" />
          </div>
        ) : (
          <AppointmentList
            appointments={appointments.slice(0, 3)}
            perspective="doctor"
            emptyMessage="No appointments yet."
          />
        )}
      </section>
    </>
  );
}

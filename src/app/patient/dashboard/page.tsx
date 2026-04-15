"use client";

import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Spinner } from "@/src/components/ui/Spinner";
import { AppointmentList } from "@/src/components/shared/AppointmentList";
import { useDoctors } from "@/src/hooks/useDoctor";
import { useMyAppointments } from "@/src/hooks/useAppointment";
import { useRouter } from "next/navigation";
import dashStyles from "./Dashboard.module.css";
import pageStyles from "@/src/components/shared/PageStyles.module.css";

export default function PatientDashboard() {
  const router = useRouter();
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const { data: appointmentData, isLoading: appointmentsLoading } = useMyAppointments({ limit: 5 });

  const totalDoctors = doctors?.length ?? 0;
  const appointments = appointmentData?.appointments ?? [];

  /* Compute counts from real data */
  const bookedCount = appointments.filter((a) => a.status === "booked").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;

  const isStatsLoading = doctorsLoading || appointmentsLoading;

  const STATS = [
    { label: "Upcoming",      value: isStatsLoading ? "…" : String(bookedCount),     icon: "📅", variant: "statIconPrimary"  as const },
    { label: "Completed",     value: isStatsLoading ? "…" : String(completedCount),  icon: "✅", variant: "statIconSuccess"  as const },
    { label: "Total",         value: isStatsLoading ? "…" : String(appointments.length), icon: "📋", variant: "statIconWarning"  as const },
    { label: "Total Doctors", value: isStatsLoading ? "…" : String(totalDoctors),    icon: "👨‍⚕️", variant: "statIconAccent" as const },
  ];

  return (
    <>
      {/* Stat Cards */}
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

      {/* Upcoming Appointments */}
      <section className={dashStyles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className={dashStyles.sectionTitle}>Recent Appointments</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/patient/appointments")}
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
            perspective="patient"
            emptyMessage="No appointments yet. Find a doctor to book your first one!"
          />
        )}
      </section>

      {/* Available Doctors quick-view */}
      <section className={dashStyles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className={dashStyles.sectionTitle}>Available Doctors</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/patient/doctors")}
          >
            View All →
          </Button>
        </div>

        {doctorsLoading ? (
          <div className={pageStyles.centered}>
            <Spinner size="lg" />
          </div>
        ) : !doctors || doctors.length === 0 ? (
          <div className={dashStyles.emptyState}>
            <div className={dashStyles.emptyStateIcon}>🔍</div>
            <p className={dashStyles.emptyStateText}>
              No doctors available at the moment.
            </p>
          </div>
        ) : (
          <div className={dashStyles.appointmentList}>
            {doctors.slice(0, 3).map((doc) => (
              <div key={doc._id} className={dashStyles.appointmentRow}>
                <div className={dashStyles.appointmentInfo}>
                  <span className={dashStyles.appointmentDoctor}>
                    Dr. {doc.userId?.name || "Unknown"}
                  </span>
                  <span className={dashStyles.appointmentMeta}>
                    {doc.specialization} • {doc.experience} yrs • ₹{doc.consultationFee}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/patient/doctors")}
                >
                  Book
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

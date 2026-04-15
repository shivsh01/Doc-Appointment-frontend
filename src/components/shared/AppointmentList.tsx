"use client";

import { useUpdateAppointmentStatus } from "@/src/hooks/useAppointment";
import { Button } from "@/src/components/ui/Button";

import { Appointment, AppointmentStatus } from "@/src/types/appointment.type";
import styles from "@/src/components/shared/PageStyles.module.css";

/* ---- Status → badge class mapping ---- */
const STATUS_BADGE: Record<AppointmentStatus, { className: string; label: string }> = {
  booked:    { className: styles.badgeBooked,    label: "Booked" },
  completed: { className: styles.badgeCompleted, label: "Completed" },
  cancelled: { className: styles.badgeCancelled, label: "Cancelled" },
  no_show:   { className: styles.badgePending,   label: "No Show" },
};

interface AppointmentListProps {
  appointments: Appointment[];
  /** "patient" shows doctorId, "doctor" shows patientId label */
  perspective: "patient" | "doctor";
  emptyMessage?: string;
}

export function AppointmentList({
  appointments,
  perspective,
  emptyMessage = "No appointments found.",
}: AppointmentListProps) {
  const { mutate: updateStatus, isPending } = useUpdateAppointmentStatus();

  if (appointments.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📭</div>
        <p className={styles.emptyStateText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.appointmentList}>
      {appointments.map((apt) => {
        const badge = STATUS_BADGE[apt.status];

        return (
          <div key={apt._id} className={styles.appointmentRow}>
            <div className={styles.appointmentInfo}>
              <span className={styles.appointmentDoctor}>
                {perspective === "patient"
                  ? `Doctor: ${apt.doctorId?.userId?.name || apt.doctorId?.name || "Unknown"} ${apt.doctorId?.specialization ? `(${apt.doctorId.specialization})` : ""}`
                  : `Patient: ${apt.patientId?.name || "Unknown"}`}
              </span>
              <span className={styles.appointmentMeta}>
                📅 {apt.date} • 🕐 {apt.time} • 💳{" "}
                {apt.paymentStatus === "paid" ? "Paid" : "Pending"}
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {(perspective === "patient" && apt.status === "booked") && (
                <Button variant="danger" size="sm" onClick={() => updateStatus({ id: apt._id, status: "cancelled" })} disabled={isPending}>
                  Cancel
                </Button>
              )}
              {(perspective === "doctor" && apt.status === "booked") && (
                <>
                  <Button variant="primary" size="sm" onClick={() => updateStatus({ id: apt._id, status: "completed" })} disabled={isPending}>
                    Complete
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => updateStatus({ id: apt._id, status: "cancelled" })} disabled={isPending}>
                    Cancel
                  </Button>
                </>
              )}
              <span className={`${styles.badge} ${badge.className}`}>
                {badge.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

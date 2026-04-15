"use client";

import { useDoctorPatients } from "@/src/hooks/useDoctor";
import { Card } from "@/src/components/ui/Card";
import { Spinner } from "@/src/components/ui/Spinner";
import styles from "@/src/components/shared/PageStyles.module.css";

export default function DoctorPatientsPage() {
  const { data: patients, isLoading, isError } = useDoctorPatients();

  if (isLoading) return <div className={styles.centered}><Spinner size="lg" /></div>;
  if (isError) return <div>Failed to load patients.</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Patients</h1>
      </div>

      {!patients || patients.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🧑‍🤝‍🧑</div>
          <p className={styles.emptyStateText}>
            Patients who have booked with you will appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {patients.map((patient: any) => (
            <Card key={patient._id || patient.id} padding="md">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: "0 0 0.25rem 0" }}>{patient.name}</h3>
                  <p style={{ margin: "0", color: "var(--color-text-light)" }}>{patient.email}</p>
                </div>
                {patient.phone && (
                  <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-light)" }}>
                    📞 {patient.phone}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

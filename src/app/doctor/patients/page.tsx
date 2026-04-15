"use client";

import styles from "@/src/components/shared/PageStyles.module.css";

export default function DoctorPatientsPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Patients</h1>
      </div>
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>🧑‍🤝‍🧑</div>
        <p className={styles.emptyStateText}>
          Patients who have booked with you will appear here.
        </p>
      </div>
    </>
  );
}

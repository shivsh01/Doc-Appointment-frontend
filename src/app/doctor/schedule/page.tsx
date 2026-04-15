"use client";

import styles from "@/src/components/shared/PageStyles.module.css";

export default function DoctorSchedulePage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Schedule</h1>
      </div>
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>🕐</div>
        <p className={styles.emptyStateText}>
          Manage your availability and time slots here.
        </p>
      </div>
    </>
  );
}

"use client";

import styles from "@/src/components/shared/PageStyles.module.css";

export default function PatientRecordsPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Records</h1>
      </div>
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>📋</div>
        <p className={styles.emptyStateText}>
          Your medical records will appear here once available.
        </p>
      </div>
    </>
  );
}

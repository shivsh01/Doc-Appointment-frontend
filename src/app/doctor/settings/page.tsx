"use client";

import styles from "@/src/components/shared/PageStyles.module.css";

export default function DoctorSettingsPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
      </div>
      <div className={styles.emptyState}>
        <div className={styles.emptyStateIcon}>⚙️</div>
        <p className={styles.emptyStateText}>
          Account settings and preferences coming soon.
        </p>
      </div>
    </>
  );
}

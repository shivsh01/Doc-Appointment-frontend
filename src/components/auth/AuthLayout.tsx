import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const FEATURES = [
  "Book appointments in seconds",
  "Track your medical history",
  "Get reminders & notifications",
  "Connect with top doctors",
];

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {/* ------- Left branding panel ------- */}
      <div className={styles.heroPanel}>
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>
            <span className={styles.heroLogoIcon}>🩺</span>
            <span className={styles.heroLogoText}>MediConnect</span>
          </div>

          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>

          <ul className={styles.featureList}>
            {FEATURES.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Floating decoration */}
        <div className={styles.heroDeco1} />
        <div className={styles.heroDeco2} />
        <div className={styles.heroDeco3} />
      </div>

      {/* ------- Right form panel ------- */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>{children}</div>
      </div>
    </div>
  );
}

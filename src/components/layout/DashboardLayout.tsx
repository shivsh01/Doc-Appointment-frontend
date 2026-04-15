"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";
import styles from "./DashboardLayout.module.css";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
}

export function DashboardLayout({ children, navItems }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = mounted && user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ---- Sidebar ---- */}
      <aside className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ""}`}>
        <Link href="/" className={styles.sidebarLogo}>
          <span className={styles.sidebarLogoIcon}>🩺</span>
          <span className={styles.sidebarLogoText}>MediConnect</span>
        </Link>

        {/* Close Button for Mobile Sidebar */}
        <button
          className={styles.closeSidebarBtn}
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>

        <ul className={styles.navList}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}

          <li className={styles.navSpacer} />

          {/* Logout at bottom */}
          <li>
            <button
              onClick={handleLogout}
              className={styles.navItem}
              style={{ border: "none", background: "none", width: "100%", textAlign: "left" }}
            >
              <span className={styles.navIcon}>🚪</span>
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* ---- Main ---- */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button
              className={styles.hamburgerBtn}
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <div className={styles.greeting}>
              <h1>Hi, {mounted ? (user?.name || "User") : "User"} 👋</h1>
              <p>Here&apos;s what&apos;s happening today</p>
            </div>
          </div>
          <div className={styles.avatar}>{initials}</div>
        </div>

        {children}
      </main>
    </div>
  );
}

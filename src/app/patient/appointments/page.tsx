"use client";

import { useState } from "react";
import { useMyAppointments } from "@/src/hooks/useAppointment";
import { AppointmentList } from "@/src/components/shared/AppointmentList";
import { FilterBar } from "@/src/components/shared/FilterBar";
import { Button } from "@/src/components/ui/Button";
import { Spinner } from "@/src/components/ui/Spinner";
import { AppointmentStatus, PaginationQuery } from "@/src/types/appointment.type";
import styles from "@/src/components/shared/PageStyles.module.css";
import filterStyles from "@/src/components/shared/FilterBar.module.css";

export default function PatientAppointmentsPage() {
  const [status, setStatus] = useState<AppointmentStatus | "">("");
  const [date, setDate] = useState("");
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const query: PaginationQuery = {
    ...(status && { status }),
    ...(date && { date }),
    ...(cursor && { cursor }),
    limit: 10,
  };

  const { data, isLoading, error } = useMyAppointments(query);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Appointments</h1>
      </div>

      <FilterBar
        status={status}
        onStatusChange={(s) => { setStatus(s); setCursor(undefined); }}
        date={date}
        onDateChange={(d) => { setDate(d); setCursor(undefined); }}
      />

      {isLoading ? (
        <div className={styles.centered}>
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className={styles.errorBanner}>
          Failed to load appointments. Please try again.
        </div>
      ) : (
        <>
          <AppointmentList
            appointments={data?.appointments ?? []}
            perspective="patient"
            emptyMessage="No appointments yet. Head to Find Doctors to book your first one!"
          />

          {/* Cursor pagination */}
          {data?.meta?.nextCursor && (
            <div className={filterStyles.paginationBar}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCursor(data.meta.nextCursor!)}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

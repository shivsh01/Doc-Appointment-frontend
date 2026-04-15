"use client";

import { AppointmentStatus } from "@/src/types/appointment.type";
import styles from "./FilterBar.module.css";

const STATUS_OPTIONS: { value: AppointmentStatus | ""; label: string }[] = [
  { value: "",          label: "All" },
  { value: "booked",    label: "Booked" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show",   label: "No Show" },
];

interface FilterBarProps {
  status: AppointmentStatus | "";
  onStatusChange: (status: AppointmentStatus | "") => void;
  date: string;
  onDateChange: (date: string) => void;
}

export function FilterBar({
  status,
  onStatusChange,
  date,
  onDateChange,
}: FilterBarProps) {
  const hasFilters = status !== "" || date !== "";

  return (
    <div className={styles.filterBar}>
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.filterChip} ${
            status === opt.value ? styles.filterChipActive : ""
          }`}
          onClick={() => onStatusChange(opt.value as AppointmentStatus | "")}
        >
          {opt.label}
        </button>
      ))}

      <input
        type="date"
        className={styles.filterDateInput}
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        placeholder="Filter by date"
      />

      {hasFilters && (
        <button
          className={styles.filterClearBtn}
          onClick={() => {
            onStatusChange("");
            onDateChange("");
          }}
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}

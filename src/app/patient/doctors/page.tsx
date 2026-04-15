"use client";

import { useState } from "react";
import { useDoctors } from "@/src/hooks/useDoctor";
import { useAvailableSlots, useBookAppointment } from "@/src/hooks/useAppointment";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Spinner } from "@/src/components/ui/Spinner";
import { Doctor } from "@/src/types/doctor.type";
import styles from "@/src/components/shared/PageStyles.module.css";

export default function FindDoctorsPage() {
  const { data: doctors, isLoading, error } = useDoctors();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const {
    data: slots,
    isLoading: slotsLoading,
  } = useAvailableSlots(selectedDoctor?._id || "", selectedDate);

  const {
    mutate: book,
    isPending: booking,
    isSuccess: booked,
    error: bookError,
    reset: resetBooking,
  } = useBookAppointment();

  const handleBook = () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) return;
    book({
      doctorId: selectedDoctor._id || "",
      date: selectedDate,
      time: selectedSlot,
    });
  };

  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setSelectedSlot("");
    resetBooking();
  };

  /* Today's date as min value for date picker */
  const today = new Date().toISOString().split("T")[0];

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorBanner}>
        Failed to load doctors. Please try again.
      </div>
    );
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Find Doctors</h1>
      </div>

      {!doctors || doctors.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🔍</div>
          <p className={styles.emptyStateText}>
            No approved doctors available at the moment.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {doctors.map((doc) => (
            <Card key={doc._id} padding="md">
              <div className={styles.doctorCard}>
                {/* Header */}
                <div className={styles.doctorHeader}>
                  <div className={styles.doctorAvatar}>
                    {doc.userId?.name?.[0]?.toUpperCase() || "D"}
                  </div>
                  <div>
                    <h3 className={styles.doctorName}>
                      Dr. {doc.userId?.name || "Unknown"}
                    </h3>
                    <p className={styles.doctorSpecialty}>
                      {doc.specialization}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className={styles.doctorMeta}>
                  <span className={styles.metaItem}>
                    🏥 {doc.experience} yrs exp
                  </span>
                  <span className={styles.metaItem}>
                    💰 ₹{doc.consultationFee}
                  </span>
                  <span className={styles.metaItem}>
                    🕐 {doc.startTime} – {doc.endTime}
                  </span>
                  <span className={styles.metaItem}>
                    ⏱ {doc.slotDuration} min slots
                  </span>
                </div>

                {/* Slot picker (expanded for selected doctor) */}
                {selectedDoctor?._id === doc._id ? (
                  <div className={styles.slotSection}>
                    <input
                      type="date"
                      className={styles.dateInput}
                      value={selectedDate}
                      min={today}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedSlot("");
                        resetBooking();
                      }}
                    />

                    {selectedDate && slotsLoading && (
                      <div className={styles.centered}>
                        <Spinner />
                      </div>
                    )}

                    {selectedDate && slots && slots.length > 0 && (
                      <div className={styles.slotsGrid}>
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            className={`${styles.slotChip} ${
                              selectedSlot === slot
                                ? styles.slotChipSelected
                                : ""
                            }`}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}

                    {selectedDate && slots && slots.length === 0 && (
                      <p className={styles.emptyStateText}>
                        No slots available for this date.
                      </p>
                    )}

                    {booked && (
                      <div className={styles.successBanner}>
                        ✅ Appointment booked successfully!
                      </div>
                    )}

                    {bookError && (
                      <div className={styles.errorBanner}>
                        {(
                          bookError as {
                            response?: { data?: { message?: string } };
                          }
                        )?.response?.data?.message ||
                          "Failed to book. Try again."}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        gap: "var(--space-sm)",
                        marginTop: "var(--space-md)",
                      }}
                    >
                      <Button
                        variant="primary"
                        size="md"
                        isLoading={booking}
                        disabled={!selectedSlot || booked}
                        onClick={handleBook}
                      >
                        Book Appointment
                      </Button>
                      <Button
                        variant="ghost"
                        size="md"
                        onClick={() => setSelectedDoctor(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectDoctor(doc)}
                  >
                    View Slots
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

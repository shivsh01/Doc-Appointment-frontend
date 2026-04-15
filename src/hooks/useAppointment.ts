"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAvailableSlots,
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
} from "@/src/services/appointment.service";
import { BookAppointmentPayload, PaginationQuery } from "@/src/types/appointment.type";

/* ---- Centralised query keys ---- */
export const APPOINTMENT_KEYS = {
  slots: (doctorId: string, date: string) => ["slots", doctorId, date] as const,
  myAppointments: (query: PaginationQuery) => ["appointments", "patient", query] as const,
  doctorAppointments: (query: PaginationQuery) => ["appointments", "doctor", query] as const,
};

/** Fetch available slots for a given doctor + date */
export function useAvailableSlots(doctorId: string, date: string) {
  return useQuery({
    queryKey: APPOINTMENT_KEYS.slots(doctorId, date),
    queryFn: () =>
      getAvailableSlots(doctorId, date).then((res) => res.data.data),
    enabled: !!doctorId && !!date,
  });
}

/** Book an appointment */
export function useBookAppointment() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: BookAppointmentPayload) => bookAppointment(payload),
    onSuccess: (_data, variables) => {
      /* Invalidate slots + appointment lists so UI refreshes */
      qc.invalidateQueries({
        queryKey: APPOINTMENT_KEYS.slots(variables.doctorId, variables.date),
      });
      qc.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

/** Fetch patient's own appointments (auth + patient role) */
export function useMyAppointments(query: PaginationQuery = {}) {
  return useQuery({
    queryKey: APPOINTMENT_KEYS.myAppointments(query),
    queryFn: () =>
      getMyAppointments(query).then((res) => res.data.data),
  });
}

/** Fetch doctor's appointments (auth + doctor role) */
export function useDoctorAppointments(query: PaginationQuery = {}) {
  return useQuery({
    queryKey: APPOINTMENT_KEYS.doctorAppointments(query),
    queryFn: () =>
      getDoctorAppointments(query).then((res) => res.data.data),
  });
}

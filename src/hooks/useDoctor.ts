"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllDoctors, getMyDoctorProfile, createDoctorProfile, updateDoctorProfile, updateDoctorSchedule, getPublicDoctor, getDoctorPatients, getDoctorDashboardStats } from "@/src/services/doctor.service";
import { CreateDoctorPayload, UpdateDoctorPayload, UpdateSchedulePayload } from "@/src/types/doctor.type";

/* ---- Query keys (centralised to avoid stale-key bugs) ---- */
export const DOCTOR_KEYS = {
  all: ["doctors"] as const,
  me: ["doctor", "me"] as const,
  public: (id: string) => ["doctor", "public", id] as const,
  patients: ["doctor", "patients"] as const,
  dashboard: ["doctor", "dashboard"] as const,
};

/** Fetch all approved doctors (public) */
export function useDoctors() {
  return useQuery({
    queryKey: DOCTOR_KEYS.all,
    queryFn: () => getAllDoctors().then((res) => res.data.data.doctor),
  });
}

/** Fetch logged-in doctor's own profile */
export function useMyDoctorProfile() {
  return useQuery({
    queryKey: DOCTOR_KEYS.me,
    queryFn: () => getMyDoctorProfile().then((res) => res.data.data.doctor),
  });
}

/** Create doctor profile (onboarding) */
export function useCreateDoctorProfile() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload) => createDoctorProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: DOCTOR_KEYS.me });
    },
  });
}

export function useUpdateDoctorProfile() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDoctorPayload) => updateDoctorProfile(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: DOCTOR_KEYS.me }),
  });
}

export function useUpdateDoctorSchedule() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSchedulePayload) => updateDoctorSchedule(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: DOCTOR_KEYS.me }),
  });
}

export function usePublicDoctor(id: string) {
  return useQuery({
    queryKey: DOCTOR_KEYS.public(id),
    queryFn: () => getPublicDoctor(id).then((res) => res.data.data.doctor),
    enabled: !!id,
  });
}

export function useDoctorPatients() {
  return useQuery({
    queryKey: DOCTOR_KEYS.patients,
    queryFn: () => getDoctorPatients().then((res) => res.data.data.patients),
  });
}

export function useDoctorDashboardStats() {
  return useQuery({
    queryKey: DOCTOR_KEYS.dashboard,
    queryFn: () => getDoctorDashboardStats().then((res) => res.data.data.stats),
  });
}

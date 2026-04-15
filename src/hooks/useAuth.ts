"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginService, registerService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { Role } from "@/src/types/auth.type";

/** Map role → post-login landing page */
const ROLE_REDIRECT: Record<Role, string> = {
  [Role.PATIENT]: "/patient/dashboard",
  [Role.DOCTOR]: "/doctor/dashboard",
};

export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      const { user, token } = response?.data?.data || {};
      if (user && token) {
        setAuth(user, token);
        router.push(ROLE_REDIRECT[user.role] || "/");
      }
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: registerService,
    onSuccess: (response) => {
      const { user, token } = response?.data?.data || {};
      if (user && token) {
        setAuth(user, token);
        router.push(ROLE_REDIRECT[user.role] || "/");
      }
    },
  });
}

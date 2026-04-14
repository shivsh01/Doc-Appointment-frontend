import { useMutation } from "@tanstack/react-query";
import { Login, Register } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";

export function useLogin() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: Login,
    onSuccess: (response) => {
      const { user, token } = response?.data?.data || {};
      setAuth(user, token);
      alert("Login successful");
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: Register,
    onSuccess: (response) => {
      const { user, token } = response?.data?.data || {};
      if (user && token) {
        setAuth(user, token);
      }
      alert("Registration successful");
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Registration failed");
    },
  });
}

import { AuthLayout } from "@/src/components/auth/AuthLayout";
import { LoginForm } from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Manage your health appointments effortlessly."
      subtitle="Your gateway to personalized healthcare. Book, track, and stay connected with your doctors."
    >
      <LoginForm />
    </AuthLayout>
  );
}
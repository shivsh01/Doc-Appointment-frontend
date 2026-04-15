import { redirect } from "next/navigation";

export default function Home() {
  /* Default entry point — send unauthenticated users to login */
  redirect("/login");
}

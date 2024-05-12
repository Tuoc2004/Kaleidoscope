import dynamic from "next/dynamic";

import App from "./app";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

// const Application = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  if (!isAdmin()) {
    redirect("/");
  }

  return (
    <App />
  );
}

export default AdminPage;
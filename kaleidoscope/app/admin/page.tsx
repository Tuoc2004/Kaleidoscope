import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  const is_admin = isAdmin();

  if (!is_admin) redirect("/");

  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;

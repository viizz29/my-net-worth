import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import { PrivateRoute } from "../auth/auth-route";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <div className="flex min-h-screen bg-white transition-colors duration-300 dark:bg-slate-950">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="p-6 text-slate-900 dark:text-slate-100">{children}</main>
        </div>
      </div>
    </PrivateRoute>
  );
}

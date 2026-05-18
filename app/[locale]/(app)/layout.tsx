import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import { PrivateRoute } from "../../auth/auth-route";

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 bg-background p-6 text-foreground transition-colors duration-300">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}

import Sidebar from "@/app/components/side-bar";
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
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </PrivateRoute>
  );
}

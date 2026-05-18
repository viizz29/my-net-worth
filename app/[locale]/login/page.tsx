import { AuthRoute } from "../../auth/auth-route";
import Login from "./login";

export default function LoginPage() {
  return (
    <AuthRoute>
      <Login />
    </AuthRoute>
  );
}

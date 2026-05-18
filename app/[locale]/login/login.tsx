import LoginForm from "./login-form";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(212,212,212,0.35),_transparent_45%),linear-gradient(180deg,_#fafaf9_0%,_#f5f5f4_100%)] px-4 py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}

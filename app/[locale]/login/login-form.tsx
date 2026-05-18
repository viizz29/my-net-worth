"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/auth/use-auth";
import { loginApi } from "@/app/api-calls/auth-api";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),

    onSuccess: (data) => {
      login(data.token);
      router.push("/");
    },

    onError: (error) => {
      console.error(error);
      alert("Invalid credentials");
    },
  });

  return (
    <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-black/5">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Login
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Sign in to continue to your dashboard.
        </p>
      </div>

      {mutation.isError && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Login failed
        </div>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate(values, {
            onSettled: () => {
              setSubmitting(false);
            },
          });
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none transition focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200"
                placeholder="you@example.com"
              />
              {touched.email && errors.email ? (
                <p className="text-sm text-red-600">{errors.email}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none transition focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200"
                placeholder="Enter your password"
              />
              {touched.password && errors.password ? (
                <p className="text-sm text-red-600">{errors.password}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending || isSubmitting}
              className="w-full rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              {mutation.isPending ? "Signing in..." : "Login"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

"use client";

import { supabase } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await supabase.auth.signInWithPassword({
        email: email,
        password: "111111",
        phone: "1234567890",
      }),
    onSuccess: () => push("/"),
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-disabled"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-dark-2 p-2.5 text-white focus:outline-none"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-sm font-light text-gray-500">
          Don’t have an account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Suspense>
  );
}

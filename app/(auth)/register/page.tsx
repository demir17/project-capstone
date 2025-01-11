"use client";

import { useState } from "react";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function Page() {
  const [email, setEmail] = useState("");
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await supabase.auth.signUp({
        email: email,
        password: "111111",
      }),
    onSuccess: () => push("/login"),
  });

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="mx-auto flex flex-col items-center justify-center lg:py-0">
        <div className="mb-6 flex items-center gap-4 text-2xl font-semibold text-white">
          <i className="ph ph-fingerprint rounded-full bg-primary p-2 text-3xl"></i>
          <h1>Project - X</h1>
        </div>

        <div className="w-full rounded-lg bg-dark-1 shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign up to your account
            </h1>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* {error && <p className="text-sm text-red-500">{error}</p>} */}

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary"
                disabled={isPending}
              >
                {isPending ? "Signing up..." : "Sign up"}
              </button>

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

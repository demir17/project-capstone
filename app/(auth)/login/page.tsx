import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="mx-auto flex flex-col items-center justify-center lg:py-0">
        <div className="mb-6 flex items-center gap-4 text-2xl font-semibold text-white">
          <i className="ph ph-lock-simple rounded-full bg-primary p-2 text-3xl"></i>
          <h1>Project - Capstone</h1>
        </div>

        <div className="w-full rounded-lg bg-dark-1 shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign in to your account
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}

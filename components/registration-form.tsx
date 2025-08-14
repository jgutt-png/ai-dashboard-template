"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

interface AuthFormProps {
  mode: "login" | "register";
}

export function RegistrationFormWithImages({ mode }: AuthFormProps) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
      <Form mode={mode} />
      <div className="relative z-20 hidden w-full items-center justify-center overflow-hidden border-l border-neutral-100 bg-white md:flex dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-sm">
          <FeaturedTestimonials />
          <p
            className={cn(
              "text-center text-xl font-semibold text-neutral-600 dark:text-neutral-400",
            )}
          >
            People love us
          </p>
          <p
            className={cn(
              "mt-8 text-center text-base font-normal text-neutral-500 dark:text-neutral-400",
            )}
          >
            AI Dashboard Template is loved by thousands of people across the world, be part
            of the community and join us.
          </p>
        </div>

        <GridLineHorizontal
          className="left-1/2 top-4 -translate-x-1/2"
          offset="-10px"
        />
        <GridLineHorizontal
          className="bottom-4 left-1/2 top-auto -translate-x-1/2"
          offset="-10px"
        />
        <GridLineVertical
          className="left-10 top-1/2 -translate-y-1/2"
          offset="-10px"
        />
        <GridLineVertical
          className="left-auto right-10 top-1/2 -translate-y-1/2"
          offset="-10px"
        />
      </div>
    </div>
  );
}

function Form({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const callbackUrl = searchParams?.get("from") || "/dashboard";

  async function onSubmit(data: any) {
    setIsLoading(true);
    
    try {
      if (mode === "register") {
        // For registration, we'll create the user then sign them in
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Registration failed");
        }
      }

      // Sign in with credentials
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.push(callbackUrl);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onMagicLink(email: string) {
    setIsLoading(true);
    
    try {
      await signIn("email", {
        email,
        redirect: false,
        callbackUrl,
      });
      setIsMagicLinkSent(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send magic link",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onOAuthSignIn(provider: string) {
    setIsLoading(true);
    
    try {
      await signIn(provider, {
        callbackUrl,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  if (isMagicLinkSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-neutral-950">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            Check your email
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            We've sent a magic link to {form.getValues("email")}
          </p>
          <button
            onClick={() => setIsMagicLinkSent(false)}
            className="text-sm text-black underline dark:text-white"
          >
            Back to {mode === "login" ? "sign in" : "sign up"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-neutral-950">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div>
            <div className="flex">
              <Logo />
            </div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
              {mode === "login" ? "Sign in to your account" : "Sign up for an account"}
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        {...form.register("name", { required: mode === "register" })}
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
                        className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      {...form.register("email", { required: true })}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="hello@example.com"
                      className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-neutral-700 dark:text-neutral-400"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      {...form.register("password", { required: true })}
                      id="password"
                      type="password"
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                      placeholder="••••••••"
                      className="shadow-input block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 sm:text-sm sm:leading-6 dark:bg-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative z-10 flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-black/90 disabled:opacity-50 md:text-sm dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-xl"
                  >
                    {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up"}
                  </button>
                  <p
                    className={cn(
                      "mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400",
                    )}
                  >
                    {mode === "login" ? (
                      <>
                        Don't have an account?{" "}
                        <Link href="/register" className="text-black dark:text-white">
                          Sign up
                        </Link>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <Link href="/login" className="text-black dark:text-white">
                          Sign in
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </form>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-gray-50 px-6 text-neutral-400 dark:bg-neutral-950 dark:text-neutral-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => onOAuthSignIn("github")}
                  disabled={isLoading}
                  className="relative z-10 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-black transition duration-200 hover:bg-gray-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                >
                  <IconBrandGithub className="h-5 w-5" />
                  <span className="text-sm font-semibold leading-6">
                    Github
                  </span>
                </button>

                <button
                  onClick={() => onOAuthSignIn("google")}
                  disabled={isLoading}
                  className="relative z-10 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-black transition duration-200 hover:bg-gray-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                >
                  <IconBrandGoogle className="h-5 w-5" />
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
                </button>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => onMagicLink(form.getValues("email"))}
                  disabled={isLoading || !form.watch("email")}
                  className="relative z-10 flex w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-black transition duration-200 hover:bg-gray-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                >
                  Send magic link
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
                By clicking continue, you agree to our{" "}
                <Link
                  href="#"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
        <span className="text-sm font-bold text-white dark:text-black">A</span>
      </div>
      <span className="font-medium text-black dark:text-white">AI Dashboard</span>
    </Link>
  );
};

export const FeaturedTestimonials = ({
  className,
  containerClassName,
}: {
  textClassName?: string;
  className?: string;
  showStars?: boolean;
  containerClassName?: string;
}) => {
  const images = [
    {
      name: "John Doe",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      name: "Robert Johnson",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Jane Smith",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Emily Davis",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      name: "Tyler Durden",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      name: "Dora",
      src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];
  return (
    <div className={cn("flex flex-col items-center", containerClassName)}>
      <div
        className={cn(
          "mb-2 flex flex-col items-center justify-center sm:flex-row",
          className,
        )}
      >
        <div className="mb-4 flex flex-row items-center sm:mb-0">
          {images.map((image, idx) => (
            <div className="group relative -mr-4" key={image.name}>
              <div>
                <motion.div
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-full border-2 border-neutral-200"
                >
                  <Image
                    height={100}
                    width={100}
                    src={image.src}
                    alt={image.name}
                    className="h-8 w-8 object-cover object-top md:h-14 md:w-14"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
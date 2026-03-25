import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { mutate: login, isPending } = useLogin();
  const { isAuthenticated, refetchUser } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const onSubmit = (data: LoginFormValues) => {
    login({ data }, {
      onSuccess: () => {
        refetchUser(); // Update auth context
        toast({ title: "Welcome back!", variant: "default" });
        setLocation("/dashboard");
      },
      onError: (error: any) => {
        toast({ 
          title: "Login failed", 
          description: error?.message || "Invalid credentials. Please try again.",
          variant: "destructive" 
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex bg-background selection:bg-primary/30 selection:text-primary">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-muted items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Unsplash luxury architecture */}
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=1600&fit=crop" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center mb-6 border border-primary/30 shadow-2xl">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">Partner Portal</h2>
          <p className="text-lg text-muted-foreground">Access exclusive listings, manage your leads, and grow your real estate portfolio.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your agent portal</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input 
                type="email"
                {...form.register("email")}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="you@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-foreground">Password</label>
                <a href="#" className="text-xs text-primary hover:underline" onClick={(e) => e.preventDefault()}>Forgot password?</a>
              </div>
              <input 
                type="password"
                {...form.register("password")}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
              />
              {form.formState.errors.password && (
                <p className="text-destructive text-sm mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isPending}
              className="w-full py-4 mt-2 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

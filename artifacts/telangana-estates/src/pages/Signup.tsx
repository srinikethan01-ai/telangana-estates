import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignup } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Building2, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const { mutate: signup, isPending } = useSignup();
  const { isAuthenticated, refetchUser } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const onSubmit = (data: SignupFormValues) => {
    signup({ data }, {
      onSuccess: () => {
        refetchUser(); // Fetch user to update auth state
        toast({ title: "Account created!", description: "Welcome to Telangana Estates.", variant: "default" });
        setLocation("/login"); // Flow usually implies auto-login, but based on docs we redirect or just let auth context handle it. Let's redirect to login for explicit action or dashboard if API auto-logs in.
      },
      onError: (error: any) => {
        toast({ 
          title: "Signup failed", 
          description: error?.message || "An error occurred during registration.",
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
           {/* Unsplash modern luxury interior */}
          <img 
            src="https://pixabay.com/get/gade918a8c042618a21e1f3cc34bff0ea7a5e5364297485bd7e641bc62712a0834711f02a93b4e475c0b015a3dff06a7eef6f29cbe78b7d4c1a2123e67eadef8a_1280.jpg" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay grayscale-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center mb-6 border border-primary/30 shadow-2xl">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">Join The Network</h2>
          <p className="text-lg text-muted-foreground">Elevate your real estate career with premium tools and exclusive inventory access.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join our premium agent network</p>
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
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input 
                type="password"
                {...form.register("password")}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Create a strong password (min 6 chars)"
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
              {isPending ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

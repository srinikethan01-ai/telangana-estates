import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-card border border-border flex items-center justify-center mb-8 shadow-xl shadow-black/20">
          <Building2 className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-7xl font-display font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The exclusive property or page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}

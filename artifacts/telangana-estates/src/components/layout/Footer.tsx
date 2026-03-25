import { Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold text-xl tracking-wider text-foreground">
                Telangana<span className="text-primary">Estates</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Your trusted partner for safe, high-yield real estate investments in the fastest growing corridors of Hyderabad and Telangana.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/#properties" className="text-sm text-muted-foreground hover:text-primary transition-colors">Exclusive Properties</a></li>
              <li><a href="/#plans" className="text-sm text-muted-foreground hover:text-primary transition-colors">Agent Network</a></li>
              <li><a href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Vision</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">Konda Srinikethan</li>
              <li>
                <a href="tel:+917075471886" className="text-sm text-primary hover:underline">
                  +91 7075471886
                </a>
              </li>
              <li>
                <a href="https://wa.me/917075471886" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Telangana Estates. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            Made with <span className="font-semibold text-foreground">Replit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

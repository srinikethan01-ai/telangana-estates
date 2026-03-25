import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, TrendingUp, Gem, MapPin, Building, ArrowRight, Check } from "lucide-react";
import { useListProperties, useListPlans, useCreateLead } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const leadSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

export default function Landing() {
  const { data: properties = [], isLoading: isLoadingProps } = useListProperties();
  const { data: plans = [], isLoading: isLoadingPlans } = useListPlans();
  const { mutate: submitLead, isPending: isSubmitting } = useCreateLead();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof leadSchema>>({
    resolver: zodResolver(leadSchema),
    defaultValues: { fullName: "", phone: "" },
  });

  const onSubmit = (data: z.infer<typeof leadSchema>) => {
    submitLead({ data }, {
      onSuccess: () => {
        toast({ title: "Request received!", description: "Our luxury property consultants will reach out shortly." });
        form.reset();
      },
      onError: () => {
        toast({ title: "Something went wrong.", description: "Please try again or contact us directly.", variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Luxury Real Estate Villa" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-black/40" /> {/* Extra darkening for contrast */}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Gem className="w-4 h-4" />
                <span>Premium Real Estate SaaS</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1] text-foreground mb-6">
                Your Trusted Partner for <br />
                <span className="text-gradient-gold italic">Safe Investments</span> <br />
                in Telangana
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                Our platform prioritizes your investment safety and ensures reliable, high-yield returns in the fastest growing real estate market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#properties"
                  className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  Explore Properties
                </a>
                <a 
                  href="#lead-form"
                  className="px-8 py-4 rounded-xl bg-secondary text-foreground border border-border font-semibold text-lg flex items-center justify-center gap-2 hover:bg-secondary/80 hover:-translate-y-1 transition-all duration-300"
                >
                  Get Best Deals
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 relative z-20 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Verified Properties", desc: "Every listing is thoroughly vetted for legal compliance and clear titles." },
              { icon: TrendingUp, title: "High ROI", desc: "Curated selections in high-growth corridors of Hyderabad and Telangana." },
              { icon: Gem, title: "Premium Portfolio", desc: "Access to exclusive off-market deals and luxury pre-launch projects." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card/80 backdrop-blur-md border border-border/50 p-8 rounded-2xl shadow-xl shadow-black/20 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES SECTION */}
      <section id="properties" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 text-foreground">Exclusive Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our hand-picked selection of premium real estate opportunities currently available in the market.
            </p>
          </div>

          {isLoadingProps ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-96 bg-card rounded-2xl border border-border animate-pulse" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop, i) => (
                <motion.div 
                  key={prop.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {prop.imageUrl ? (
                      <img src={prop.imageUrl} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                    )}
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-border text-foreground uppercase tracking-wider">
                      {prop.status}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="font-display text-2xl font-bold text-primary mb-1">{prop.price}</div>
                      <div className="flex items-center gap-1 text-sm opacity-90">
                        <MapPin className="w-4 h-4" /> {prop.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-primary mb-3 uppercase tracking-widest font-semibold">
                      <Building className="w-3 h-3" /> {prop.type}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{prop.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">{prop.description}</p>
                    <a href="#lead-form" className="w-full py-3 rounded-xl border border-primary/30 text-primary font-medium text-center hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2">
                      Inquire Now <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-3xl border border-border border-dashed">
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-foreground mb-2">No premium properties listed at the moment.</h3>
              <p className="text-muted-foreground">Check back soon for exclusive off-market deals.</p>
            </div>
          )}
        </div>
      </section>

      {/* PLANS SECTION */}
      <section id="plans" className="py-24 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 text-foreground">Agent Subscriptions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our network of premium agents. Get exclusive leads, priority listings, and advanced analytics.
            </p>
          </div>

          {isLoadingPlans ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1,2,3].map(i => <div key={i} className="h-[500px] bg-card rounded-3xl border border-border animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              {plans.map((plan, i) => (
                <motion.div 
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative p-8 rounded-3xl border flex flex-col ${
                    plan.popular 
                      ? 'bg-card border-primary/50 shadow-2xl shadow-primary/10 md:-translate-y-4' 
                      : 'bg-background border-border hover:border-border/80'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 text-foreground">
                      <span className="text-4xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground">/ month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    disabled
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground opacity-50 cursor-not-allowed' 
                        : 'bg-secondary text-foreground border border-border opacity-50 cursor-not-allowed'
                    }`}
                  >
                    Buy {plan.name} <span className="font-normal text-sm opacity-80">(Coming Soon)</span>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT & LEAD SECTION (SPLIT) */}
      <section id="about" className="py-24 bg-card relative border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* About Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-semibold mb-6 text-foreground">About Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Telangana Estates was founded with a singular mission: to provide a transparent, secure, and highly profitable avenue for real estate investments in one of India's fastest-growing regions.
              </p>
              
              <div className="p-6 bg-background rounded-2xl border border-border/50 mb-8">
                <div className="text-sm text-primary uppercase tracking-widest font-semibold mb-2">Leadership</div>
                <div className="font-display text-2xl text-foreground mb-1">Konda Srinikethan</div>
                <div className="text-muted-foreground">Founder & Managing Director</div>
              </div>

              <p className="text-muted-foreground leading-relaxed italic">
                "We leverage deep local market knowledge to curate properties that aren't just homes, but generational assets. Trust us to guide your next big move."
              </p>
            </motion.div>

            {/* Lead Form */}
            <motion.div 
              id="lead-form"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-background p-8 md:p-10 rounded-3xl border border-border shadow-2xl relative overflow-hidden"
            >
              {/* Form subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2">Get The Best Deals</h3>
                <p className="text-muted-foreground mb-8">Register your interest and our luxury property consultants will reach out with exclusive off-market opportunities.</p>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input 
                      {...form.register("fullName")}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Enter your full name"
                    />
                    {form.formState.errors.fullName && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input 
                      {...form.register("phone")}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="+91"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-destructive text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Request Call Back"}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center">
                  <span className="text-muted-foreground text-sm">Prefer to chat? </span>
                  <a href="https://wa.me/917075471886" target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                    Contact on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useListLeads, useLogout } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Building2, Users, Crown, Loader2, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading: authLoading, refetchUser } = useAuth();
  const [, setLocation] = useLocation();
  const { data: leads = [], isLoading: leadsLoading } = useListLeads({
    query: {
      enabled: isAuthenticated, // Only fetch if authed
    }
  });

  // Protect route
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, authLoading, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dashboard Header */}
          <div className="mb-10 pb-8 border-b border-border flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">Agent Portal</h1>
              <p className="text-muted-foreground">Welcome back, <span className="text-foreground font-medium">{user.email}</span></p>
            </div>
            
            <div className="bg-card border border-border px-5 py-3 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Plan</div>
                <div className="font-medium text-foreground capitalize text-lg">{user.subscriptionTier || 'Free'}</div>
              </div>
              {!user.subscriptionTier && (
                <a href="/#plans" className="ml-4 pl-4 border-l border-border text-sm text-primary hover:underline font-medium flex items-center gap-1">
                  Upgrade <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{leads.length}</div>
              <div className="text-sm text-muted-foreground">Total Leads Received</div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm opacity-50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">Coming Soon</span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">--</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm opacity-50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">Pro Plan Only</span>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">Analytics</div>
              <div className="text-sm text-muted-foreground">Market Insights</div>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-border bg-background/50 flex justify-between items-center">
              <h2 className="text-xl font-display font-semibold text-foreground">Recent Leads</h2>
              <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full border border-border">Confidential Data</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground text-sm uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-sm">
                  {leadsLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        No leads generated yet. Share your properties to start receiving inquiries.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-muted-foreground">#{lead.id}</td>
                        <td className="px-6 py-4 font-medium text-foreground">{lead.fullName}</td>
                        <td className="px-6 py-4 text-foreground">{lead.phone}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {lead.status || 'New'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

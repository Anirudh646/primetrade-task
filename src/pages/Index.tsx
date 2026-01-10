import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckSquare, Shield, Zap, Users, ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold gradient-text">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Manage Tasks with{" "}
              <span className="gradient-text">Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up">
              A secure, scalable task management platform with authentication, 
              real-time updates, and a beautiful dashboard. Built for modern teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/signup">
                <Button size="lg" className="glow-effect w-full sm:w-auto">
                  Start Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built for <span className="gradient-text">Security & Scale</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Secure Authentication",
                description: "JWT-based auth with password hashing. Your data is protected with industry-standard security.",
              },
              {
                icon: Zap,
                title: "Fast & Scalable",
                description: "Built on modern infrastructure that scales with your needs. No slowdowns, ever.",
              },
              {
                icon: Users,
                title: "User-Centric Design",
                description: "Intuitive interface with profile management, search, filters, and real-time updates.",
              },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 rounded-xl text-center group hover:border-primary/30 transition-all">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get organized?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of users managing their tasks efficiently with TaskFlow.
          </p>
          <Link to="/signup">
            <Button size="lg" className="glow-effect">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 TaskFlow. Built with React, Tailwind CSS & Lovable Cloud.</p>
        </div>
      </footer>
    </div>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react";
import { isAuthenticated } from "../lib/auth";
import Footer from "../components/general/Footer";
import WavyBackground from "../components/images/hero-menu.svg"

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const features = [
    {
      icon: <ListTodo className="w-8 h-8 text-primary" />,
      title: "Easy Ticket Management",
      description: "Create, update, and track tickets with a simple, intuitive interface.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Real-time Updates",
      description: "Monitor ticket status changes and stay informed with instant notifications.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Analytics Dashboard",
      description: "Visualize your team's performance with comprehensive statistics.",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      title: "Status Tracking",
      description: "Track tickets from open to closed with clear status indicators.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListTodo className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">TicketApp</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/get-started")}>
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative w-full bg-linear-to-b from-primary/10 to-background flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 overflow-hidden">
        {/* Wavy Background (SVG clip-path) */}
        {/* <div
          className="absolute inset-0 bg-primary/10"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 80%, 50% 95%, 0 80%)",
          }}
        ></div> */}


        <div className="absolute inset-0 overflow-hidden">
          <img
            src={WavyBackground}
            alt="Wavy background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        {/* Decorative Circle */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-accent/30 rounded-full blur-3xl"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Streamline Your Workflow
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Manage tickets efficiently with our powerful, intuitive platform. Track progress, collaborate with your team, and deliver results faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/get-started")} className="shadow-lg">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Login to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container max-w-[1440px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your tickets effectively
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="mb-4 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="container max-w-[1440px] mx-auto px-6 py-16 mb-16">
        <Card className="bg-linear-to-r from-primary to-accent border-none shadow-xl rounded-2xl">
          <CardContent className="p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using TicketApp to streamline their workflow.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate("/get-started")} className="shadow-lg">
              Create Your Account
            </Button>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

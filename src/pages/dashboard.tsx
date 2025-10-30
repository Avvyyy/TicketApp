import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ListTodo, LogOut, TicketIcon, CheckCircle2, Clock } from "lucide-react";
import { getSession, clearSession } from "../lib/auth";
import { getTicketStats } from "../lib/ticket";
import { toast } from "sonner";
import Footer from "../components/general/Footer";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUserName(session.name);
    }
    setStats(getTicketStats());
  }, []);

  const handleLogout = () => {
    clearSession();
    toast.success("Logged out successfully", {
      description: "See you next time!",
    });
    navigate("/");
  };

  const statCards = [
    {
      title: "Total Tickets",
      value: stats.total,
      icon: <TicketIcon className="w-8 h-8 text-primary" />,
      description: "All tickets in the system",
      bgColor: "bg-primary/10",
    },
    {
      title: "Open Tickets",
      value: stats.open,
      icon: <ListTodo className="w-8 h-8 text-status-open" />,
      description: "Tickets awaiting action",
      bgColor: "bg-status-open/10",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <Clock className="w-8 h-8 text-status-in-progress" />,
      description: "Currently being worked on",
      bgColor: "bg-status-in-progress/10",
    },
    {
      title: "Resolved",
      value: stats.closed,
      icon: <CheckCircle2 className="w-8 h-8 text-status-closed" />,
      description: "Completed tickets",
      bgColor: "bg-status-closed/10",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="w-full border-b border-border bg-card">
          <nav className="container max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">TicketApp</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, <span className="font-medium text-foreground">{userName}</span>
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </nav>
        </header>

        {/* Main Dashboard */}
        <main className="flex-1 container max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your ticket management system</p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className={`w-14 h-14 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
                    {stat.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
                  <CardDescription className="font-medium">{stat.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your tickets efficiently</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1" size="lg">
                <Link to="/tickets">View All Tickets</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1" size="lg">
                <Link to="/tickets?action=create">Create New Ticket</Link>
              </Button>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
};


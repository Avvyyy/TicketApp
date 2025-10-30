import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { ListTodo, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getTickets, createTicket, updateTicket, deleteTicket } from "../lib/ticket"
import type {Ticket, TicketStatus } from "../lib/ticket"
import { ticketSchema } from "../lib/validation";
import type { TicketForm } from "../lib/validation";
import Footer from "../components/general/Footer";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

const statusColors: Record<TicketStatus, string> = {
  open: "bg-status-open text-white",
  in_progress: "bg-status-in-progress text-white",
  closed: "bg-status-closed text-white",
};

const statusLabels: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
};

const TicketsContent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<TicketForm>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      status: "open",
    },
  });

  const watchStatus = watch("status");

  useEffect(() => {
    loadTickets();
    if (searchParams.get("action") === "create") {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

  const loadTickets = () => {
    setTickets(getTickets());
  };

  const handleOpenDialog = (ticket?: Ticket) => {
    if (ticket) {
      setEditingTicket(ticket);
      setValue("title", ticket.title);
      setValue("description", ticket.description);
      setValue("status", ticket.status);
    } else {
      setEditingTicket(null);
      reset({ title: "", description: "", status: "open" });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTicket(null);
    reset();
  };

  const onSubmit = (data: TicketForm) => {
    if (editingTicket) {
      const updated = updateTicket(editingTicket.id, data);
      if (updated) {
        toast.success("Ticket updated successfully", {
          description: `Ticket "${data.title}" has been updated`,
        });
        loadTickets();
        handleCloseDialog();
      }
    } else {
      createTicket({
        title: data.title,
        description: data.description,
        status: data.status,
      });
      toast.success("Ticket created successfully", {
        description: `Ticket "${data.title}" has been created`,
      });
      loadTickets();
      handleCloseDialog();
    }
  };

  const handleDelete = (ticket: Ticket) => {
    if (confirm(`Are you sure you want to delete "${ticket.title}"?`)) {
      const deleted = deleteTicket(ticket.id);
      if (deleted) {
        toast.success("Ticket deleted", {
          description: "Ticket has been removed",
        });
        loadTickets();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full border-b border-border bg-card">
        <nav className="container max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">Tickets</span>
            </div>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </nav>
      </header>

      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Ticket Management</h1>
          <p className="text-muted-foreground">Create, update, and track all your tickets</p>
        </div>

        {tickets.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-16 text-center">
              <ListTodo className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
              <p className="text-muted-foreground mb-6">Get started by creating your first ticket</p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <CardTitle className="text-lg line-clamp-1">{ticket.title}</CardTitle>
                    <Badge className={statusColors[ticket.status]} variant="secondary">
                      {statusLabels[ticket.status]}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{ticket.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleOpenDialog(ticket)}>
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDelete(ticket)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingTicket ? "Edit Ticket" : "Create New Ticket"}</DialogTitle>
            <DialogDescription>
              {editingTicket ? "Update the ticket details below" : "Fill in the details to create a new ticket"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter ticket title"
                {...register("title")}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the ticket in detail"
                rows={4}
                {...register("description")}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={watchStatus} onValueChange={(value) => setValue("status", value as TicketStatus)}>
                <SelectTrigger className={errors.status ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {editingTicket ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

const Tickets = () => {
  return (
    <ProtectedRoute>
      <TicketsContent />
    </ProtectedRoute>
  );
};

export default Tickets;

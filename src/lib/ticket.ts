const TICKETS_KEY = "ticketapp_tickets";

export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: number;
  updatedAt: number;
}

export const getTickets = (): Ticket[] => {
  const ticketsData = localStorage.getItem(TICKETS_KEY);
  if (!ticketsData) return [];

  try {
    return JSON.parse(ticketsData);
  } catch {
    return [];
  }
};

export const saveTickets = (tickets: Ticket[]): void => {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

export const createTicket = (ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">): Ticket => {
  const tickets = getTickets();
  const newTicket: Ticket = {
    ...ticket,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  tickets.push(newTicket);
  saveTickets(tickets);
  return newTicket;
};

export const updateTicket = (id: string, updates: Partial<Omit<Ticket, "id" | "createdAt">>): Ticket | null => {
  const tickets = getTickets();
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tickets[index] = {
    ...tickets[index],
    ...updates,
    updatedAt: Date.now(),
  };
  saveTickets(tickets);
  return tickets[index];
};

export const deleteTicket = (id: string): boolean => {
  const tickets = getTickets();
  const filtered = tickets.filter((t) => t.id !== id);
  if (filtered.length === tickets.length) return false;
  saveTickets(filtered);
  return true;
};

export const getTicketStats = () => {
  const tickets = getTickets();
  return {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };
};

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;        // ISO 8601 date string
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: number;
  ordererName: string;
  ordererEmail: string;
  eventId: number;
  event: Event;        // Relasi JOIN saat GET /tickets
  createdAt: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
}

export interface CreateTicketDto {
  ordererName: string;
  ordererEmail: string;
  eventId: number;
}

export interface EventStatResponse {
  event: Event;
  ticketCount: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

import type {
  Event,
  Ticket,
  CreateEventDto,
  UpdateEventDto,
  CreateTicketDto,
  EventStatResponse,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMessage = `HTTP error ${res.status}`;
    try {
      const data = await res.json();
      errorMessage = data.message || errorMessage;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMessage);
  }
  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}

export async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch(`${API_BASE}/events`);
    return handleResponse<Event[]>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal memuat data event. Coba lagi.'
    );
  }
}

export async function createEvent(data: CreateEventDto): Promise<Event> {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Event>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal membuat event. Coba lagi.'
    );
  }
}

export async function updateEvent(id: number, data: UpdateEventDto): Promise<Event> {
  try {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Event>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal memperbarui event. Coba lagi.'
    );
  }
}

export async function deleteEvent(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal menghapus event. Coba lagi.'
    );
  }
}

export async function getMostTicketsEvent(): Promise<EventStatResponse> {
  try {
    const res = await fetch(`${API_BASE}/events/most-tickets`);
    return handleResponse<EventStatResponse>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal memuat statistik event. Coba lagi.'
    );
  }
}

export async function getLeastTicketsEvent(): Promise<EventStatResponse> {
  try {
    const res = await fetch(`${API_BASE}/events/least-tickets`);
    return handleResponse<EventStatResponse>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal memuat statistik event. Coba lagi.'
    );
  }
}

export async function getTickets(eventName?: string): Promise<Ticket[]> {
  try {
    const url = eventName
      ? `${API_BASE}/tickets?eventName=${encodeURIComponent(eventName)}`
      : `${API_BASE}/tickets`;
    const res = await fetch(url);
    return handleResponse<Ticket[]>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal memuat data tiket. Coba lagi.'
    );
  }
}

export async function createTicket(data: CreateTicketDto): Promise<Ticket> {
  try {
    const res = await fetch(`${API_BASE}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Ticket>(res);
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : 'Gagal memesan tiket. Coba lagi.'
    );
  }
}

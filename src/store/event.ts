import { create } from "zustand";

const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

//
// ─── Types that mirror Go models ─────────────────────────────────────────────
//
export interface User {
    ID: string;
    name: string;
    image_url: string | null;
    email: string;
}

export interface EventUpdater {
    event_updater_id: string;
    ref_event_id: string;
    updated_by_id: string;
    updated_by: User;
    UpdatedAt: string; // ISO
}

export interface Event {
    event_id: string;
    CreatedAt: string;
    UpdatedAt: string;
    title: string;
    description: string;
    location: string;
    event_start_time: string;
    event_end_time: string;
    is_canceled: boolean;
    is_rescheduled: boolean;
    created_by_id: string;
    created_by: User;
    event_updaters: EventUpdater[];
}

export type CreateEventPayload = Omit<Event, "event_id" | "CreatedAt" | "UpdatedAt" | "created_by_id" | "created_by" | "event_updaters">;

//
// ─── Store state & actions ───────────────────────────────────────────────────────
//
interface EventState {
    loadEvents: (page: number) => Promise<Event[]>;
    createEvent: (payload: CreateEventPayload) => Promise<string | null>;
    getEventById: (event_id: string) => Promise<Event | undefined>;
    updateEvent: (event_id: string, payload: Partial<Event>) => Promise<string | null>;
    deleteEvent: (event_id: string) => Promise<boolean>;
}

export const useEventStore = create<EventState>()(() => ({
    // ─── Load Events (based on page number) ───────────────────────────
    loadEvents: async (page: number = 1) => {
        let events: Event[] = [];
        try {
            const res = await fetch(`${API_BASE}/event/?page=${page}`);
            if (res.status !== 200) throw new Error(await res.text());

            events = (await res.json()).events as Event[];
        } catch (err: any) {
            events = [];
        } finally {
            return events;
        }
    },

    // ─── Create ───────────────────────────────────────────────────────
    createEvent: async (payload) => {
        let event_id: string | null = null;
        try {
            const res = await fetch(`${API_BASE}/event/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
                redirect: "follow",
            });
            if (res.status !== 201) throw new Error(await res.text());
            const created: Event = (await res.json()).event;

            event_id = created.event_id;
        } catch (err: any) {
            event_id = null;
        } finally {
            return event_id;
        }
    },

    // ─── GET ──────────────────────────────────────────────────────────
    getEventById: async (event_id) => {
        let data: Event | undefined;

        try {
            const res = await fetch(`${API_BASE}/event/${event_id}`);
            if (res.status !== 200) throw new Error(await res.text());
            data = (await res.json()).event;
        } catch (err: any) {
            data = undefined;
        } finally {
            return data;
        }
    },

    // ─── Update ───────────────────────────────────────────────────────
    updateEvent: async (event_id, payload) => {
        let updated_event_id: string | null = "";
        try {
            const res = await fetch(`${API_BASE}/event/${event_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });
            if (res.status !== 200) throw new Error(await res.text());

            updated_event_id = (await res.json()).event.event_id;
        } catch (err: any) {
            updated_event_id = null;
        } finally {
            return updated_event_id;
        }
    },

    // ─── Delete ───────────────────────────────────────────────────────
    deleteEvent: async (event_id) => {
        let deleted = false;
        try {
            const res = await fetch(`${API_BASE}/event/${event_id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            deleted = res.status === 200;
        } catch (err: any) {
            deleted = false;
        } finally {
            return deleted;
        }
    },
}));

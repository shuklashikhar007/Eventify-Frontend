import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { CalendarClock, CalendarPlus, MapPin, Loader, PlusCircle, Type, AlignLeft } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useEventStore, type CreateEventPayload } from "@/store/event";

const CreateEvent = () => {
    const navigate = useNavigate();
    const user = useUserStore((s) => s.user);
    const { createEvent } = useEventStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [eventStartTime, setEventStartTime] = useState(new Date().toISOString());
    const [eventEndTime, setEventEndTime] = useState(new Date().toISOString());
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const event: CreateEventPayload = {
            title,
            description,
            location,
            event_start_time: new Date(eventStartTime).toISOString(),
            event_end_time: new Date(eventEndTime).toISOString(),
            is_canceled: false,
            is_rescheduled: false,
        };

        setIsCreating(true);
        const event_id = await createEvent(event);
        if (event_id) navigate(`/event/${event_id}`);
        setIsCreating(false);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-12 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-slate-900 px-8 py-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 mix-blend-overlay" />
                    <PlusCircle className="size-12 text-fuchsia-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Create New Event</h1>
                    <p className="text-slate-400 mt-2">Fill in the details below to notify the campus.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                            <Type className="size-4 text-fuchsia-500" /> Event Title
                        </label>
                        <input type="text" required minLength={2} maxLength={200} placeholder="e.g. Annual Tech Symposium" value={title} onChange={(e) => setTitle(e.target.value)} 
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all" />
                    </div>

                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                            <AlignLeft className="size-4 text-fuchsia-500" /> Description
                        </label>
                        <textarea required minLength={2} maxLength={1000} placeholder="What is this event about?" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all resize-y" />
                    </div>

                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                            <MapPin className="size-4 text-fuchsia-500" /> Location
                        </label>
                        <input type="text" required minLength={2} maxLength={255} placeholder="e.g. Main Auditorium" value={location} onChange={(e) => setLocation(e.target.value)} 
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                                <CalendarClock className="size-4 text-fuchsia-500" /> Start Time
                            </label>
                            <input type="datetime-local" required value={eventStartTime.slice(0, 16)} onChange={(e) => setEventStartTime(e.target.value)} 
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>

                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                                <CalendarPlus className="size-4 text-fuchsia-500" /> End Time
                            </label>
                            <input type="datetime-local" required value={eventEndTime.slice(0, 16)} onChange={(e) => setEventEndTime(e.target.value)} 
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all [color-scheme:light] dark:[color-scheme:dark]" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={!user || isCreating} 
                            className={`w-full py-4 rounded-xl flex justify-center items-center gap-2 text-white font-bold text-lg transition-all duration-300 shadow-lg ${user ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] shadow-fuchsia-500/25" : "bg-slate-400 dark:bg-slate-700 cursor-not-allowed shadow-none"}`}>
                            {isCreating ? <Loader className="size-5 animate-spin" /> : <><PlusCircle className="size-5" /> Publish Event</>}
                        </button>
                        {!user && <p className="text-red-500 text-sm text-center mt-3 font-medium">Please log in to create an event.</p>}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateEvent;
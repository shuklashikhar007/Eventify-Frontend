import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { CalendarClock, CalendarPlus, MapPin, Loader, Pencil, ShieldOff, ShieldCheck, Type, AlignLeft } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useEventStore, type Event } from "@/store/event";

const EditEvent = () => {
    const navigate = useNavigate();
    const { event_id } = useParams<{ event_id: string }>();
    const user = useUserStore((s) => s.user);
    const { updateEvent, getEventById } = useEventStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventEndTime, setEventEndTime] = useState("");
    const [isCanceled, setIsCanceled] = useState(false);
    const [isRescheduled, setIsRescheduled] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!event_id) return;
        (async () => {
            const fetchedEvent = await getEventById(event_id);
            if (fetchedEvent) {
                setTitle(fetchedEvent.title);
                setDescription(fetchedEvent.description);
                setLocation(fetchedEvent.location);
                setEventStartTime(fetchedEvent.event_start_time);
                setEventEndTime(fetchedEvent.event_end_time);
                setIsCanceled(fetchedEvent.is_canceled);
                setIsRescheduled(fetchedEvent.is_rescheduled);
            }
            setLoading(false);
        })();
    }, [event_id, getEventById]);

    if (loading) return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center gap-4 bg-slate-50 dark:bg-slate-950">
            <Loader className="size-8 text-fuchsia-500 animate-spin" />
            <span className="text-sm font-medium text-slate-500 uppercase tracking-widest animate-pulse">Loading Event...</span>
        </div>
    );

    if (!title || !event_id) return (
        <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center bg-slate-50 dark:bg-slate-950">
            <span className="text-lg font-medium text-slate-500">Event not found.</span>
        </div>
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const event: Partial<Event> = {
            title,
            description,
            location,
            event_start_time: new Date(eventStartTime).toISOString(),
            event_end_time: new Date(eventEndTime).toISOString(),
            is_canceled: isCanceled,
            is_rescheduled: isRescheduled,
        };

        setIsUpdating(true);
        const updated_event_id = await updateEvent(event_id, event);
        if (updated_event_id) navigate(`/event/${updated_event_id}`);
        setIsUpdating(false);
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
                    <Pencil className="size-12 text-fuchsia-400 mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit Event</h1>
                    <p className="text-slate-400 mt-2">Update the details and keep everyone informed.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                            <Type className="size-4 text-fuchsia-500" /> Event Title
                        </label>
                        <input type="text" required minLength={2} maxLength={200} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} 
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all" />
                    </div>

                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                            <AlignLeft className="size-4 text-fuchsia-500" /> Description
                        </label>
                        <textarea required minLength={2} maxLength={1000} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all resize-y" />
                    </div>

                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                            <MapPin className="size-4 text-fuchsia-500" /> Location
                        </label>
                        <input type="text" required minLength={2} maxLength={255} placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} 
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

                    {/* Status Toggles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${isCanceled ? 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20' : 'bg-slate-50 border-slate-200 dark:bg-slate-950/50 dark:border-slate-800'}`}>
                            <ShieldOff className={`size-5 ${isCanceled ? 'text-red-500' : 'text-slate-400'}`} />
                            <span className={`font-semibold ${isCanceled ? 'text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>Mark as Canceled</span>
                            <input type="checkbox" checked={isCanceled} onChange={(e) => setIsCanceled(e.target.checked)} className="ml-auto size-5 accent-red-500" />
                        </label>
                        
                        <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${isRescheduled ? 'bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20' : 'bg-slate-50 border-slate-200 dark:bg-slate-950/50 dark:border-slate-800'}`}>
                            <ShieldCheck className={`size-5 ${isRescheduled ? 'text-amber-500' : 'text-slate-400'}`} />
                            <span className={`font-semibold ${isRescheduled ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}`}>Mark Rescheduled</span>
                            <input type="checkbox" checked={isRescheduled} onChange={(e) => setIsRescheduled(e.target.checked)} className="ml-auto size-5 accent-amber-500" />
                        </label>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={!user || isUpdating} 
                            className={`w-full py-4 rounded-xl flex justify-center items-center gap-2 text-white font-bold text-lg transition-all duration-300 shadow-lg ${user ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] shadow-fuchsia-500/25" : "bg-slate-400 dark:bg-slate-700 cursor-not-allowed shadow-none"}`}>
                            {isUpdating ? <Loader className="size-5 animate-spin" /> : <><Pencil className="size-5" /> Save Changes</>}
                        </button>
                        {!user && <p className="text-red-500 text-sm text-center mt-3 font-medium">Please log in to update this event.</p>}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditEvent;
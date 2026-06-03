import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { 
    Loader, Pencil, Trash, Clock, UserCircle, MapPin, 
    Calendar, History, AlertCircle, RefreshCw 
} from "lucide-react";
import { useEventStore, type Event } from "@/store/event";

const formatDateTime = (iso: string) => {
    return new Date(iso).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

export default function EventPage() {
    const navigate = useNavigate();
    const { event_id } = useParams<{ event_id: string }>();
    const { getEventById, deleteEvent } = useEventStore();
    
    const [event, setEvent] = useState<Event | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!event_id) return;
        (async () => {
            const fetchedEvent = await getEventById(event_id);
            if (fetchedEvent) setEvent(fetchedEvent);
            setLoading(false);
        })();
    }, [event_id, getEventById]);

    const deleteEventHandler = async () => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        try {
            setIsDeleting(true);
            const isSuccess = await deleteEvent(event!.event_id);
            if (isSuccess) navigate("/events");
            else throw new Error("You must be logged in or authorized to delete this event.");
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center gap-4 bg-slate-50 dark:bg-slate-950">
            <Loader className="size-8 text-fuchsia-500 animate-spin" />
            <span className="text-sm font-medium text-slate-500 uppercase tracking-widest animate-pulse">Fetching Event...</span>
        </div>
    );

    if (!event) return (
        <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center bg-slate-50 dark:bg-slate-950">
            <span className="text-lg font-medium text-slate-500">Event not found.</span>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 transition-colors duration-300">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden"
            >
                {/* Header Section */}
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
                        <div className="space-y-4 flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2">
                                {event.is_canceled && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 uppercase tracking-wider">
                                        <AlertCircle className="size-3.5" /> Canceled
                                    </span>
                                )}
                                {event.is_rescheduled && !event.is_canceled && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 uppercase tracking-wider">
                                        <RefreshCw className="size-3.5" /> Rescheduled
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                {event.title}
                            </h1>
                            
                            <div className="space-y-2 text-slate-600 dark:text-slate-400 font-medium">
                                <p className="flex items-center gap-2">
                                    <Calendar className="size-4 text-fuchsia-500" />
                                    {formatDateTime(event.event_start_time)} &mdash; {formatDateTime(event.event_end_time)}
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin className="size-4 text-fuchsia-500" />
                                    {event.location}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <Link 
                                to={`/edit-event/${event.event_id}`} 
                                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-fuchsia-600 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/20 transition-all shadow-sm"
                                title="Edit Event"
                            >
                                <Pencil className="size-5" />
                            </Link>
                            <button 
                                onClick={deleteEventHandler} 
                                disabled={isDeleting}
                                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 transition-all shadow-sm disabled:opacity-50"
                                title="Delete Event"
                            >
                                {isDeleting ? <Loader className="size-5 animate-spin" /> : <Trash className="size-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Body Section */}
                <div className="p-8 space-y-10">
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">About Event</h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {event.description}
                        </p>
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
                        {event.created_by.image_url ? (
                            <img src={event.created_by.image_url} alt={event.created_by.name} className="size-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm" />
                        ) : (
                            <UserCircle className="size-12 text-slate-400" />
                        )}
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Created by</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{event.created_by.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">on {formatDateTime(event.CreatedAt)}</p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-6">
                            <History className="size-5 text-fuchsia-500" /> Update History
                        </h3>
                        
                        {event.event_updaters.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No modifications have been made yet.</p>
                        ) : (
                            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-8 pb-4">
                                {[...event.event_updaters]
                                    .sort((a, b) => new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime())
                                    .map((update) => (
                                        <div key={update.event_updater_id} className="relative pl-6">
                                            <div className="absolute size-3 bg-fuchsia-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-slate-900" />
                                            <div className="flex items-start gap-3">
                                                {update.updated_by.image_url ? (
                                                    <img src={update.updated_by.image_url} alt={update.updated_by.name} className="size-8 rounded-full object-cover shadow-sm" />
                                                ) : (
                                                    <UserCircle className="size-8 text-slate-400" />
                                                )}
                                                <div>
                                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                                        <span className="font-semibold text-slate-900 dark:text-white">{update.updated_by.name}</span> updated this event
                                                    </p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                        <Clock className="size-3" /> {formatDateTime(update.UpdatedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
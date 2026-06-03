import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, MapPin, Clock, Calendar, User, ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import { useEventStore, type Event } from "@/store/event";

const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

function EventCard({ event, index }: { event: Event; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/event/${event.event_id}`} className="block group outline-none">
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-fuchsia-500/50 hover:shadow-2xl hover:shadow-fuchsia-500/10 transition-all duration-300 relative overflow-hidden">
                    
                    {/* Hover Gradient Effect */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors line-clamp-2">
                            {event.title}
                        </h2>
                        
                        {/* Status Badges */}
                        <div className="flex-shrink-0">
                            {event.is_canceled ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 uppercase tracking-wider">
                                    <AlertCircle className="size-3.5" /> Canceled
                                </span>
                            ) : event.is_rescheduled ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 uppercase tracking-wider">
                                    <RefreshCw className="size-3.5" /> Rescheduled
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                        {event.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                            <MapPin className="size-4 text-fuchsia-500" />
                            <span className="truncate" title={event.location}>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <User className="size-4 text-pink-500" />
                            <span className="truncate">By {event.created_by.name}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Calendar className="size-4 text-purple-500" />
                            <span className="truncate">{formatDate(event.event_start_time)}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Clock className="size-4 text-orange-500" />
                            <span className="truncate">{formatDate(event.event_end_time)}</span>
                        </div>
                    </div>

                    {/* Footer / Timestamps */}
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-medium">
                        <span>Created {formatDate(event.CreatedAt)}</span>
                        {/* Optional: Show updated time only if it's different from creation time */}
                        <span className="hidden sm:inline">Updated {formatDate(event.UpdatedAt)}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

const Events = () => {
    const [page, setPage] = useState(1);
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadEvents = useEventStore((e) => e.loadEvents);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const fetchedEvents = await loadEvents(page);
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Failed to load events:", error);
            } finally {
                // Small artificial delay so the loader doesn't flash too aggressively
                setTimeout(() => setIsLoading(false), 300);
            }
        };

        fetchEvents();
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, loadEvents]);

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            
            {/* Header Section */}
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 mb-4">
                    Upcoming Events
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Discover and join the latest happenings around campus.
                </p>
            </div>

            {/* Events Feed */}
            <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 gap-4"
                        >
                            <Loader className="size-8 text-fuchsia-500 animate-spin" />
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse tracking-wide uppercase">
                                Fetching Events...
                            </span>
                        </motion.div>
                    ) : events.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
                                No events found for this page.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div key="feed" className="flex flex-col gap-6 mb-12">
                            {events.map((event, idx) => (
                                <EventCard event={event} index={idx} key={event.event_id} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {!isLoading && events.length > 0 && (
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center items-center gap-4">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-fuchsia-500/50 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 shadow-sm"
                    >
                        <ChevronLeft className="size-4" /> Previous
                    </button>
                    
                    <div className="px-4 py-2 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 font-bold text-sm border border-fuchsia-100 dark:border-fuchsia-500/20">
                        Page {page}
                    </div>

                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={events.length < 10} // Assumes 10 is your limit per page
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-fuchsia-500/50 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 shadow-sm"
                    >
                        Next <ChevronRight className="size-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Events;
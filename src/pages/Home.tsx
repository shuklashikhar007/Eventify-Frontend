import { Link } from "react-router";
import { motion } from "framer-motion";
import { Calendar, PlusCircle, Sparkles } from "lucide-react";

export default function Home() {
    // Framer Motion variants for a cascading reveal effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Custom smooth easing
        },
    };

    return (
        <div className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            
            {/* Background Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/20 dark:bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/20 dark:bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="flex justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                            <Sparkles className="size-4 text-fuchsia-500" />
                            Designed for IIT BHU
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 
                        variants={itemVariants} 
                        className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                    >
                        Never Miss a <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400">
                            College Event
                        </span> Again.
                    </motion.h1>

                    {/* Subtext */}
                    <motion.div variants={itemVariants} className="max-w-2xl mx-auto space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        <p>
                            Tired of missing out on important college events just because they were buried in an endless sea of WhatsApp messages?
                        </p>
                        <p>
                            <strong className="text-slate-900 dark:text-white font-semibold">Eventify</strong> is your centralized event management platform—built to keep every student in the loop. From club fests to departmental seminars, get everything in one place, personalized just for you.
                        </p>
                        <p className="font-medium text-fuchsia-600 dark:text-fuchsia-400">
                            Create your account today, and stay notified. Always.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div 
                        variants={itemVariants} 
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link 
                            to="/events" 
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-fuchsia-500/25"
                        >
                            <Calendar className="size-5" />
                            See Upcoming Events
                        </Link>
                        
                        <Link 
                            to="/createevent" 
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 hover:border-fuchsia-500/50 dark:hover:border-fuchsia-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm"
                        >
                            <PlusCircle className="size-5" />
                            Create New Event
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
import { Mail, Linkedin } from "lucide-react";

const ContactUs = () => {
    return (
        <div className="w-full flex justify-center py-4 sm:py-8">
            <div className="w-full max-w-4xl space-y-12">
                
                {/* Header */}
                <header className="text-center space-y-4 px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 transition-colors duration-300">
                        Contact Us
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Got questions, feedback, or collaboration ideas? We'd love to hear from you! Reach out to us directly via email or connect on LinkedIn.
                    </p>
                </header>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-0">
                    
                    {/* Shikhar's Contact */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-xl hover:shadow-fuchsia-500/5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Shikhar Shukla</h2>
                            <p className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold text-xs uppercase tracking-wider mt-1 mb-6">Frontend Developer</p>
                            
                            <div className="space-y-4 mb-8">
                                <a href="mailto:shikharcocreviews2@gmail.com" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors group">
                                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-fuchsia-100 dark:group-hover:bg-fuchsia-500/20 transition-colors">
                                        <Mail className="size-5" />
                                    </div>
                                    <span className="text-sm font-medium break-all">shikharcocreviews2@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        <a 
                            href="https://www.linkedin.com/in/shikhar-shukla-2bb1372ba/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Linkedin className="size-4" /> Connect on LinkedIn
                        </a>
                    </div>

                    {/* Tanishq's Contact */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-xl hover:shadow-fuchsia-500/5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tanishq Singh</h2>
                            <p className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold text-xs uppercase tracking-wider mt-1 mb-6">Backend Developer</p>
                            
                            <div className="space-y-4 mb-8">
                                <a href="mailto:hello@tanishqsingh.com" className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors group">
                                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-fuchsia-100 dark:group-hover:bg-fuchsia-500/20 transition-colors">
                                        <Mail className="size-5" />
                                    </div>
                                    <span className="text-sm font-medium break-all">hello@tanishqsingh.com</span>
                                </a>
                            </div>
                        </div>

                        <a 
                            href="https://www.linkedin.com/in/oyetanishq/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Linkedin className="size-4" /> Connect on LinkedIn
                        </a>
                    </div>

                </div>

                {/* Closing Note Banner */}
                <div className="mx-4 sm:mx-0 mt-8 p-6 bg-fuchsia-50/50 dark:bg-fuchsia-500/5 rounded-2xl border border-fuchsia-100 dark:border-fuchsia-500/10 text-center transition-colors duration-300">
                    <p className="text-fuchsia-800 dark:text-fuchsia-300 font-medium text-sm sm:text-base">
                        We usually respond within 24 hours. Your ideas can help us make Eventify even better! 🚀
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;
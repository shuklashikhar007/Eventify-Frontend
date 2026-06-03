import { ExternalLink } from "lucide-react";

const Admins = () => {
    return (
        <div className="w-full flex justify-center py-4 sm:py-8">
            <div className="w-full max-w-5xl space-y-12">
                
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 transition-colors duration-300">
                        Meet the Admins
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-fuchsia-500 to-pink-500 mx-auto rounded-full" />
                </header>

                {/* Admin Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-0">
                    
                    {/* Tanishq's Card */}
                    <a href="https://github.com/oyetanishq" target="_blank" rel="noopener noreferrer" className="group block h-full outline-none">
                        <div className="h-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-2xl hover:shadow-fuchsia-500/10 flex flex-col items-center text-center">
                            
                            {/* Avatar with Glow Effect */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 to-pink-500 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                                <img src="https://github.com/oyetanishq.png" alt="Tanishq Singh" className="relative size-32 rounded-full object-cover border-4 border-white dark:border-slate-950 shadow-lg" />
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                                Tanishq Singh
                            </h2>
                            <span className="mt-2 px-4 py-1 text-xs font-bold tracking-wider text-fuchsia-700 bg-fuchsia-100 dark:text-fuchsia-300 dark:bg-fuchsia-500/10 rounded-full uppercase">
                                Full Stack Developer
                            </span>
                            
                            <p className="mt-5 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                                Tanishq leads the most crucial aspect of the website, ensuring smooth functionality, flawless user experience, and building efficient backend technology.
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                View GitHub <ExternalLink className="size-4" />
                            </div>
                        </div>
                    </a>

                    {/* Shikhar's Card */}
                    <a href="https://github.com/shuklashikhar007" target="_blank" rel="noopener noreferrer" className="group block h-full outline-none">
                        <div className="h-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all duration-300 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 flex flex-col items-center text-center">
                            
                            {/* Avatar with Glow Effect */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-fuchsia-500 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                                <img src="https://github.com/shuklashikhar007.png" alt="Shikhar Shukla" className="relative size-32 rounded-full object-cover border-4 border-white dark:border-slate-950 shadow-lg" />
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                                Shikhar Shukla
                            </h2>
                            <span className="mt-2 px-4 py-1 text-xs font-bold tracking-wider text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-500/10 rounded-full uppercase">
                                Front-End Developer
                            </span>
                            
                            <p className="mt-5 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                                Passionate about building intuitive UIs. Shikhar works on frontend architecture and ensures seamless visual integration of features across the platform.
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-pink-600 dark:text-pink-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                View GitHub <ExternalLink className="size-4" />
                            </div>
                        </div>
                    </a>

                </div>
            </div>
        </div>
    );
};

export default Admins;
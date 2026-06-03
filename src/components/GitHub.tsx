import { Github, ExternalLink } from "lucide-react";

const GitHub = () => {
    return (
        <div className="w-full flex justify-center py-4 sm:py-8">
            <div className="w-full max-w-4xl space-y-12">
                
                {/* Header */}
                <header className="text-center space-y-4 px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 transition-colors duration-300">
                        Connect on GitHub
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-fuchsia-500 to-pink-500 mx-auto rounded-full" />
                </header>

                {/* Profile Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-0">
                    
                    {/* Tanishq */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-2xl hover:shadow-fuchsia-500/10 flex flex-col items-center text-center group">
                        <img src="https://github.com/oyetanishq.png" alt="Tanishq Oye" className="size-24 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800 shadow-md mb-4 group-hover:scale-105 transition-transform duration-300" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Tanishq Singh</h2>
                        
                        <a href="https://github.com/oyetanishq" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg">
                            <Github className="size-4" /> Visit GitHub <ExternalLink className="size-3 opacity-50" />
                        </a>
                    </div>

                    {/* Shikhar */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 transition-all duration-300 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 flex flex-col items-center text-center group">
                        <img src="https://github.com/shuklashikhar007.png" alt="Shikhar Shukla" className="size-24 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800 shadow-md mb-4 group-hover:scale-105 transition-transform duration-300" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Shikhar Shukla</h2>
                        
                        <a href="https://github.com/shuklashikhar007" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg">
                            <Github className="size-4" /> Visit GitHub <ExternalLink className="size-3 opacity-50" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GitHub;
import { Link } from "react-router";
import { Linkedin, Github, Instagram, Users } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Copyright Section */}
                    <div className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-left font-medium">
                        &copy; {new Date().getFullYear()} Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500 font-bold">ify</span>. All rights reserved.
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                        <Link to="/LinkedIn" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-fuchsia-600 dark:text-slate-400 dark:hover:text-fuchsia-400 transition-colors">
                            <Linkedin className="size-4" /> LinkedIn
                        </Link>
                        <Link to="/Admins" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-fuchsia-600 dark:text-slate-400 dark:hover:text-fuchsia-400 transition-colors">
                            <Users className="size-4" /> Admins
                        </Link>
                        <Link to="/GitHub" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-fuchsia-600 dark:text-slate-400 dark:hover:text-fuchsia-400 transition-colors">
                            <Github className="size-4" /> GitHub
                        </Link>
                        <Link to="/Instagram" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-fuchsia-600 dark:text-slate-400 dark:hover:text-fuchsia-400 transition-colors">
                            <Instagram className="size-4" /> Instagram
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
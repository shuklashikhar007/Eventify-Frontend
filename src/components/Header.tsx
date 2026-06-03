import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useUserStore } from "@/store/user";
import { Menu, X } from "lucide-react"; // Removed Sun & Moon

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useUserStore();

    const [isOpen, setIsOpen] = useState(false);
    
    // Kept the initialization logic so your layout doesn't break, 
    // but removed setIsDark since we aren't toggling it anymore.
    const [isDark] = useState(() => {
        return localStorage.getItem("theme") === "dark" || false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const isActive = (path: string) => location.pathname === path;
    const navLinkClass = (path: string) =>
        `text-sm font-medium transition-colors duration-300 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 ${
            isActive(path)
                ? "text-fuchsia-600 dark:text-fuchsia-400 border-b-2 border-fuchsia-500 pb-1"
                : "text-slate-600 dark:text-slate-300 pb-1 border-b-2 border-transparent"
        }`;

    return (
        <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                            Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500">ify</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className={navLinkClass("/")}>Home</Link>
                        <Link to="/events" className={navLinkClass("/events")}>Events</Link>
                        <Link to="/about" className={navLinkClass("/about")}>About</Link>
                        <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>
                    </nav>

                    {/* Desktop Controls (Auth Only) */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <button
                                type="button"
                                onClick={logout}
                                className="px-5 py-2 text-sm font-semibold rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white border border-transparent hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-300"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500 shadow-md hover:shadow-fuchsia-500/25 transition-all duration-300"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center gap-3">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors"
                        >
                            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out origin-top ${
                    isOpen ? "opacity-100 scale-y-100 visible shadow-xl" : "opacity-0 scale-y-0 invisible"
                }`}
            >
                <div className="flex flex-col px-4 pt-2 pb-6 space-y-4">
                    <Link to="/" className={navLinkClass("/")}>Home</Link>
                    <Link to="/events" className={navLinkClass("/events")}>Events</Link>
                    <Link to="/about" className={navLinkClass("/about")}>About</Link>
                    <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>
                    
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                        {user ? (
                            <button
                                onClick={logout}
                                className="w-full py-2.5 text-sm font-semibold rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500 transition-colors"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
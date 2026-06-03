import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/user";
import { Loader, Mail, Lock, LogIn, AlertCircle } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const err = await login(email, password);
        setIsLoading(false);

        if (err) {
            setError(err);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="px-8 pt-10 pb-8 text-center border-b border-slate-100 dark:border-slate-800/50">
                        <div className="inline-flex items-center justify-center p-3 bg-fuchsia-50 dark:bg-fuchsia-500/10 rounded-2xl mb-4">
                            <LogIn className="size-8 text-fuchsia-600 dark:text-fuchsia-400" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Log in to Eventify to continue
                        </p>
                    </div>

                    <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="College email (e.g. you@iitbhu.ac.in)"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-slate-900 dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-100 dark:border-red-500/20">
                                        <AlertCircle className="size-4 shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl flex justify-center items-center gap-2 text-white font-bold text-lg transition-all duration-300 shadow-lg bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] shadow-fuchsia-500/25 disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? <Loader className="size-5 animate-spin" /> : "Sign In"}
                        </button>
                    </form>

                    <div className="px-8 py-6 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline transition-all">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useUserStore } from "@/store/user";
import { Loader } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Contact from "@/components/ContactUs";
import Instagram from "@/components/Instagram";
import LinkedIn from "@/components/LinkedIn";
import GitHub from "@/components/GitHub";
import Admins from "@/components/Admins";

import Home from "@/pages/Home";
import Events from "@/pages/Events";
import CreateEvent from "@/pages/CreateEvent";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import SaveToken from "@/pages/save-token";
import EventPage from "@/pages/event";
import EditEvent from "@/pages/edit-event";
import NotFound from "@/pages/not-found";
import Message from "@/pages/message";

function App() {
    const { refresh, isLoading } = useUserStore();

    useEffect(() => {
        (async () => await refresh())();
    }, []);

    if (isLoading)
        return (
            // FIX: Added dark: variants for the loading screen
            <div className="min-h-screen w-full flex flex-col gap-3 justify-center items-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-200 selection:bg-indigo-500">
                <Loader className="size-8 text-indigo-600 dark:text-indigo-500 animate-spin transition-all duration-300" />
                <span className="text-xs sm:text-sm font-medium tracking-widest text-slate-500 dark:text-slate-400 uppercase animate-pulse">
                    Please wait
                </span>
            </div>
        );

    return (
        // FIX: Dynamic light/dark backgrounds with a smooth transition
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500 selection:text-white antialiased">
            <Header />
            
            <main className="flex-grow w-full flex justify-center py-6 sm:py-10 transition-all duration-300">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/save-token/:token" element={<SaveToken />} />
                        <Route path="/Events" element={<Events />} />
                        <Route path="/event/:event_id" element={<EventPage />} />
                        <Route path="/edit-event/:event_id" element={<EditEvent />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/CreateEvent" element={<CreateEvent />} />
                        <Route path="/Instagram" element={<Instagram />} />
                        <Route path="/Github" element={<GitHub />} />
                        <Route path="/LinkedIn" element={<LinkedIn />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/Admins" element={<Admins />} />
                        <Route path="/message/:text" element={<Message />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default App;
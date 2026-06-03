const AboutUs = () => {
  return (
    <div className="w-full flex justify-center py-4 sm:py-8">
      <div className="w-full max-w-5xl space-y-16">
        
        {/* Hero Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent transition-colors duration-300">
            About Us
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </header>

        {/* Intro Section */}
        <section className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 backdrop-blur-sm shadow-xl max-w-4xl mx-auto transition-colors duration-300">
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-center sm:text-left">
            <strong className="text-indigo-600 dark:text-indigo-400 font-semibold text-xl sm:text-2xl block sm:inline mb-2 sm:mb-0">
              Eventify
            </strong>{" "}
            is more than just a project — it's a solution built by students, for students. We're passionate about using technology to make college life easier and more organized.
          </p>
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed text-center sm:text-left transition-colors duration-300">
            The idea for Eventify came from a simple problem: missing out on events buried in WhatsApp messages and scattered across platforms. We decided to solve that.
          </div>
        </section>

        {/* Developer Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-200 transition-colors duration-300">Meet the Minds Behind Eventify</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">2nd-year Chemical Engineering Undergraduates at IIT (BHU), Varanasi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shikhar's Card */}
            <div className="group relative bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-indigo-500/50 transition-all duration-300 shadow-lg dark:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Shikhar Shukla
                </h3>
                <span className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase block mt-1">
                  Frontend Developer
                </span>
                
                <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-6 leading-relaxed transition-colors duration-300">
                  <p>
                    I’m a 2nd-year undergraduate student pursuing Chemical Engineering at{" "}
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold">IIT (BHU), Varanasi</strong>. 
                    I specialize in frontend development and have designed the user interface and experience for Eventify using{" "}
                    <strong className="text-indigo-600 dark:text-indigo-300 font-medium">React, Zustand, Framer Motion</strong>, and other modern tools.
                  </p>
                  <p>
                    I’m an active member of both the{" "}
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold">Entrepreneurship Cell (E-Cell)</strong> and the{" "}
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold">Science and Technology Council</strong> of IIT BHU, where I regularly contribute to tech initiatives and collaborative projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Tanishq's Card */}
            <div className="group relative bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 transition-all duration-300 shadow-lg dark:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Tanishq Singh
                </h3>
                <span className="text-xs font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase block mt-1">
                  Backend Developer
                </span>

                <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-6 leading-relaxed transition-colors duration-300">
                  <p>
                    I’m also a 2nd-year undergraduate student in{" "}
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold">Chemical Engineering</strong> at{" "}
                    <strong className="text-slate-900 dark:text-slate-100 font-semibold">IIT (BHU), Varanasi</strong>. 
                    I’ve handled the backend development of Eventify, including event creation, database integration, and API management.
                  </p>
                  <p>
                    Apart from being a common member in various college tech initiatives, I’m also a proud member of{" "}
                    <strong className="text-purple-600 dark:text-purple-300 font-medium">COPS (Club of Programmers, IIT BHU)</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & What's Next Grid Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
          {/* Our Vision */}
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900/80 rounded-2xl p-6 sm:p-8 transition-colors duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Our Vision
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We built Eventify to ensure that{" "}
              <strong className="text-indigo-600 dark:text-indigo-300 font-medium">no student at IIT BHU ever misses out on an event</strong> — whether it’s a departmental seminar, a club fest, or a spontaneous college gathering. With centralized event management, instant visibility, and intuitive UI/UX, Eventify is here to enhance student engagement across the campus.
            </p>
          </div>

          {/* What's Next? */}
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900/80 rounded-2xl p-6 sm:p-8 transition-colors duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              What’s Next?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              We aim to continuously improve Eventify — by adding features like event reminders, RSVP tracking, club-specific filters, and more. Stay tuned as we keep innovating!
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
import "./socials.css";

const Admins = () => {
    return (
        <div className="socials-page">
            <h1 className="mb-8!">Meet the Admins of Eventify</h1>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2">
                <a href="https://github.com/oyetanishq" target="_blank" rel="noopener noreferrer">
                    <div className="admin-card">
                        <img src="https://github.com/oyetanishq.png" alt="Tanishq Oye" className="admin-img" />
                        <h2 className="font-semibold mb-3! underline underline-offset-3">Tanishq Singh</h2>
                        <p>
                            <strong>Role:</strong> Full Stack Developer{" "}
                        </p>
                        <p>Tanishq leads the most crucial aspect of the website, ensuring smooth functionality and user experience. and building effecient backend technology.</p>
                    </div>
                </a>
                <a href="https://github.com/shuklashikhar007" target="_blank" rel="noopener noreferrer">
                    <div className="admin-card">
                        <img src="https://github.com/shuklashikhar007.png" alt="Shikhar Shukla" className="admin-img" />
                        <h2 className="font-semibold mb-3! underline underline-offset-3">Shikhar Shukla</h2>
                        <p>
                            <strong>Role:</strong> Front - End - Developer
                        </p>
                        <p>Passionate about building intuitive UIs and efficient Frontend. Shikhar works on frontend architecture and ensures seamless integration of features.</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Admins;

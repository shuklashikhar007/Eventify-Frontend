import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const SaveToken = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        if (token) {
            // Save token to cookie
            Cookies.set("token", token, {
                expires: 7, // days
                secure: true,
                sameSite: "Strict",
            });
        }

        // Redirect to home
        navigate("/");
    }, [token, navigate]);

    return null;
};

export default SaveToken;

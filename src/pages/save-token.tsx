import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SaveToken = () => {
    const { token } = useParams();

    useEffect(() => {
        if (token) localStorage.setItem("token", token);

        window.location.href = "/";
    }, [token]);

    return null;
};

export default SaveToken;

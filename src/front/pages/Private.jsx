import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const getPrivate = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/private",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                sessionStorage.removeItem("token");
                navigate("/login");
                return;
            }

            setMessage(data.msg);
            setUserId(data.user_id);
        };

        getPrivate();
    }, []);

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="private-box">
            <h1 className="auth-title">Private Area</h1>

            <div className="alert alert-success mt-4">
                <h3>{message}</h3>
                <p>User ID: {userId}</p>
            </div>

            <button className="btn btn-outline-danger mt-3" onClick={logout}>
                Logout
            </button>
        </div>
    );
};
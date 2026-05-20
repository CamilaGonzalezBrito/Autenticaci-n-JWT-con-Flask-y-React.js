import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        const data = await response.json();

        if (response.ok) {
            setMessage("User created successfully");
            navigate("/login");
        } else {
            setMessage(data.msg);
        }
    };

    return (
        <div className="auth-card">
            <h1 className="auth-title text-center">Create account</h1>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            <input
                className="form-control mb-3"
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
            />

            <input
                className="form-control mb-4"
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
            />

            <button className="btn btn-rose w-100" onClick={handleSubmit}>
                Register
            </button>
        </div>
    );
};
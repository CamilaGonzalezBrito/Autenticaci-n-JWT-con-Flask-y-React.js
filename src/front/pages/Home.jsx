import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();

    return (

        <div className="container text-center mt-5">

            <div className="auth-card">

                <h1 className="auth-title">
                    Welcome ✨
                </h1>

                <p className="mb-4 text-secondary">
                    Authentication system with React + Flask + JWT
                </p>

                <div className="d-grid gap-3">

                    <button
                        className="btn btn-rose"
                        onClick={() => navigate("/signup")}
                    >
                        Create account
                    </button>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>

    );
};
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Loading";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleSignup, loading, error, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignup({ email, password });
    }

    return (
        <>
            {loading &&
                <div
                    style={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}>
                    <Loading />
                </div>}
            {error && <div
                style={{
                    backgroundColor: "red",
                    padding: "10px",
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    textAlign: "center",
                }}>
                <p style={{ color: "black" }}>{error}</p>
            </div>}
            <div style={{ padding: "0 5px" }} className={loading ? "blur-background" : undefined}>
                <div style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    padding: "30px 10px",
                    margin: "20px 0"
                }}>
                    <img src="/images/PyMeet-Logo.jpg" alt="logo"
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%"
                        }} />
                    <p style={{
                        fontSize: "2.5em",

                    }}>PiMeet</p>
                </div>

                <h2 style={{ fontSize: "2.5em" }}>Welcome! Lets Create your Account</h2>

                <hr />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label> <br />
                    <input type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required /> <br />
                    <label htmlFor="password">Password</label> <br />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required /> <br />
                    <button type="submit"
                        disabled={!email || !password}
                        style={{
                            backgroundColor: "black",
                            width: "100%",
                            borderRadius: "15px",
                            color: "white",
                            padding: "15px 0",
                            fontSize: "15px"
                        }}
                    >Create Account</button>
                </form>

                <p style={{ margin: "15px 0" }}>Have an account, <Link to="/LoginPage" >Log In</Link></p>
                <p style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)"
                }}>@ copyright {new Date().getFullYear()} </p>
            </div>
        </>
    )
};

export default SignUpPage;
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signupSchema, loginSchema } from "@/Schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiClient } from "@/lib/client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./auth.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Auth = () => {
   useEffect(() => {
    document.body.classList.remove("fade-out");
  }, []);

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nextPath = searchParams.get("next") || "/";

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  useEffect(() => {
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    signUpBtn?.addEventListener("click", () => {
      container?.classList.add("sign-up-mode");
    });

    signInBtn?.addEventListener("click", () => {
      container?.classList.remove("sign-up-mode");
    });
  }, []);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignupForm,
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onLoginSubmit = async (data) => {
    setIsLoginLoading(true);
    try {
      const res = await apiClient.post("/auth/login", data, { withCredentials: true });
      setUser(res.data.user);
      toast.success("Login successful!");
      navigate(nextPath, { replace: true });
    } catch (err) {
      console.error("Error from backend:", err.response?.data);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const onSignupSubmit = async (data) => {
    setIsSignupLoading(true);
    try {
      await apiClient.post("/auth/register", data);
      const loginRes = await apiClient.post("/auth/login", {
        email: data.email,
        password: data.password,
      }, { withCredentials: true });

      setUser(loginRes.data.user);
      toast.success("Signup successful! Logging you in...");
      resetSignupForm();
      navigate(nextPath, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <div className="dark">
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">

            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="sign-in-form">
              <h2 className="title">Log in</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Email" {...registerLogin("email")} disabled={isLoginLoading} />
              </div>
              {loginErrors.email && <p className="error text-red-600">{loginErrors.email.message}</p>}

              <div className="input-field" style={{ position: "relative" }}>
                <i className="fas fa-lock"></i>
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  {...registerLogin("password")}
                  disabled={isLoginLoading}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    pointerEvents: isLoginLoading ? "none" : "auto",
                    opacity: isLoginLoading ? 0.5 : 1,
                  }}
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {loginErrors.password && <p className="error text-red-600">{loginErrors.password.message}</p>}

                <div style={{ width: "100%", display: "flex", justifyContent:"end", marginLeft:"-360px", marginTop: "6px" }}>
                <Link to="/forgot-password" style={{ fontSize: "14px", color: "#3b82f6", textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </div> 

              <button type="submit" className="btn solid" disabled={isLoginLoading}>
                {isLoginLoading && (
                  <FaSpinner
                    className="spinner"
                    style={{ marginRight: "8px", animation: "spin 1s linear infinite" }}
                  />
                )}
                {isLoginLoading ? "Logging in..." : "Log in"}
              </button>

              <p className="social-text">or sign in with social platform</p>
              <div className="social-media">
                <a href="https://facebook.com" target="_blank" className="social-icons"><i className="fab fa-facebook"></i></a>
                <a href="https://twitter.com" target="_blank" className="social-icons"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" target="_blank" className="social-icons"><i className="fab fa-instagram"></i></a>
                <a href="https://accounts.google.com" target="_blank" className="social-icons"><i className="fab fa-google"></i></a>
              </div>
            </form>

            {/* SIGNUP */}
            <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="sign-up-form">
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Firstname" {...registerSignup("firstname")} disabled={isSignupLoading} />
              </div>
              {signupErrors.firstname && <p className="error text-red-600">{signupErrors.firstname.message}</p>}

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Lastname" {...registerSignup("lastname")} disabled={isSignupLoading} />
              </div>
              {signupErrors.lastname && <p className="error text-red-600">{signupErrors.lastname.message}</p>}

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" {...registerSignup("email")} disabled={isSignupLoading} />
              </div>
              {signupErrors.email && <p className="error text-red-600">{signupErrors.email.message}</p>}

              <div className="input-field" style={{ position: "relative" }}>
                <i className="fas fa-lock"></i>
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Password"
                  {...registerSignup("password")} disabled={isSignupLoading}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    pointerEvents: isSignupLoading ? "none" : "auto",
                    opacity: isSignupLoading ? 0.5 : 1,
                  }}
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                >
                  {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {signupErrors.password && <p className="error text-red-600">{signupErrors.password.message}</p>}

              <div className="input-field" style={{ position: "relative" }}>
                <i className="fas fa-lock"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...registerSignup("confirmPassword")} disabled={isSignupLoading}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    pointerEvents: isSignupLoading ? "none" : "auto",
                    opacity: isSignupLoading ? 0.5 : 1,
                  }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {signupErrors.confirmPassword && <p className="error text-red-600">{signupErrors.confirmPassword.message}</p>}
              <button type="submit" className="btn solid" disabled={isSignupLoading}>
                {isSignupLoading && (
                  <FaSpinner
                    className="spinner"
                    style={{ marginRight: "8px", animation: "spin 1s linear infinite" }}
                  />
                )}
                {isSignupLoading ? "Signing up..." : "Sign Up"}
              </button>

              <p className="social-text">or sign up with social platform</p>
              <div className="social-media">
                <a href="https://facebook.com" target="_blank" className="social-icons"><i className="fab fa-facebook"></i></a>
                <a href="https://twitter.com" target="_blank" className="social-icons"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" target="_blank" className="social-icons"><i className="fab fa-instagram"></i></a>
                <a href="https://accounts.google.com" target="_blank" className="social-icons"><i className="fab fa-google"></i></a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content tracking-wider">
              <h3>New Here ?</h3>
              <p className="tracking-wider">Join Our Table and Taste the Adventure, Kindly Sign Up to become One Of Us!</p>
              <button className="btn transparent" id="sign-up-btn">Sign up</button>
            </div>
            <img src="/food2.webp" className="image" alt="illustration" />
          </div>

          <div className="panel right-panel">
            <div className="content tracking-wider">
              <h3>One of Us ?</h3>
              <p className="tracking-wider">Welcome Back, Foodie! Your Table Awaits, Log in for a Flavorful Journey.</p>
              <button className="btn transparent" id="sign-in-btn">Log in</button>
            </div>
            <img src="/food2.webp" className="image" alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;











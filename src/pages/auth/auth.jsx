import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchema, loginSchema } from "@/Schema/auth.schema";
import { useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiClient } from "@/lib/client";
import "./auth.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Auth = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = location.state?.from || "/";


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
    console.log(" Payload sent to backend:");
    console.log("Email:", data.email);
    console.log("Password:", data.password);
    console.log("Payload JSON:", JSON.stringify(data));
    console.log("Type of password:", typeof data.password);

    try {
      const res = await apiClient.post("/auth/login", data, { withCredentials: true });
      setUser(res.data.user);
      toast.success("Login successful!");
     navigate(nextPath, { replace: true });;
    } catch (err) {
      console.error("Error from backend:", err.response?.data);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const onSignupSubmit = async (data) => {
    console.log("Signup form data:", data);
    try {
      await apiClient.post("/auth/register", {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
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
                <input type="text" placeholder="Email" {...registerLogin("email")} />
              </div>
              {loginErrors.email && <p className="error text-red-600 tracking-widest">{loginErrors.email.message}</p>}

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" {...registerLogin("password")} />
              </div>
              {loginErrors.password && <p className="error  text-red-600 tracking-widest">{loginErrors.password.message}</p>}

              {/* <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
                <Link to="/forgot-password" style={{ fontSize: "14px", color: "#3b82f6", textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </div> */}


              <input type="submit" value="Log in" className="btn solid" />

              <p className="social-text">or sign in with social platform</p>
              <div className="social-media">
                <a href="https://facebook.com" target="_blank" className="social-icons"><i className="fab fa-facebook"></i></a>
                <a href="https://twitter.com" target="_blank" className="social-icons"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" target="_blank" className="social-icons"><i className="fab fa-instagram"></i></a>
                <a href="https://accounts.google.com" target="_blank" className="social-icons"><i className="fab fa-google"></i></a>
              </div>
            </form>

            <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="sign-up-form">
              <h2 className="title">Sign Up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Firstname" {...registerSignup("firstname")} />
              </div>
              {signupErrors.firstname && <p className="error  text-red-600 tracking-widest">{signupErrors.firstname.message}</p>}

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Lastname" {...registerSignup("lastname")} />
              </div>
              {signupErrors.lastname && <p className="error  text-red-600 tracking-widest">{signupErrors.lastname.message}</p>}

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" {...registerSignup("email")} />
              </div>
              {signupErrors.email && <p className="error  text-red-600 tracking-widest">{signupErrors.email.message}</p>}

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" {...registerSignup("password")} />
              </div>
              {signupErrors.password && <p className="error  text-red-600 tracking-widest">{signupErrors.password.message}</p>}

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirm Password" {...registerSignup("confirmPassword")} />
              </div>
              {signupErrors.confirmPassword && <p className="error  text-red-600 tracking-widest">{signupErrors.confirmPassword.message}</p>}

              <input type="submit" value="Sign Up" className="btn solid" />
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
            <img src="/food2.png" className="image" alt="illustration" />
          </div>

          <div className="panel right-panel">
            <div className="content tracking-wider">
              <h3>One of Us ?</h3>
              <p className="tracking-wider">Welcome Back, Foodie! Your Table Awaits, Log in for a Flavorful Journey.</p>
              <button className="btn transparent" id="sign-in-btn">Log in</button>
            </div>
            <img src="/food2.png" className="image" alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

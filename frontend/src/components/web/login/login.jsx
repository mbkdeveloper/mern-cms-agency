// Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import "./login.css";

const Login = () => {
  const { loginUser } = useContext(StoreContext);
  const [showPassword, setShowPassword] = useState(false);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value.trimStart() })); // pas d'espace en début
  };

  // const validateForm = () => {
  //   if (currState === "Sign Up" && !data.name.trim()) {
  //     return "Name is required";
  //   }
  //   if (!data.email.trim()) {
  //     return "Email is required";
  //   }
  //   if (!/\S+@\S+\.\S+/.test(data.email)) {
  //     return "Invalid email format";
  //   }
  //   if (!data.password) {
  //     return "Password is required";
  //   }
  //   if (data.password.length < 8) {
  //     return "Password must be at least 8 characters";
  //   }
  //   return "";
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationError = validateForm();
    // if (validationError) {
    //   setError(validationError);
    //   return;
    // }
    setError("");
    const result = await loginUser(data, currState === "Login");
    if (result.success) {
      navigate("/admin/profile/me", { replace: true });
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>{currState === "Login" ? "Welcome Back" : "Create Account"}</h2>
            <p>
              {currState === "Login"
                ? "Please sign in to continue."
                : "Sign up to get started."}
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {currState === "Sign Up" && (
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    id="name"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    type="text"
                    placeholder="Your Name"
                    required
                  />
                  <label htmlFor="name">Name</label>
                </div>
              </div>
            )}

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  id="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Your Email"
                  required
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  placeholder="Your Password"
                  required
                />
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="password-toggle"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span
                    className={`eye-icon ${
                      showPassword ? "show-password" : ""
                    }`}
                  ></span>
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              <span className="btn-text">
                {currState === "Login" ? "Sign In" : "Sign Up"}
              </span>
            </button>
          </form>

          <div className="signup-link">
            <p>
              {currState === "Login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => setCurrState("Sign Up")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6366f1",
                      cursor: "pointer",
                    }}
                  >
                    Register now!
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setCurrState("Login")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6366f1",
                      cursor: "pointer",
                    }}
                  >
                    Login here
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

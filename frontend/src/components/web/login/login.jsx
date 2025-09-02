// Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const validateForm = () => {
    if (currState === "Sign Up" && !data.name.trim()) return "Name is required";
    if (!data.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(data.email)) return "Invalid email format";
    if (!data.password) return "Password is required";
    if (data.password.length < 3) return "Password must be at least 8 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    const result = await loginUser(data, currState === "Login");
    if (result.success) {
      navigate("/admin/profile/me", { replace: true });
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <LoginBody>
      <LoginContainer>
        <LoginCard>
          <LoginHeader>
            <h2>{currState === "Login" ? "Welcome Back" : "Create Account"}</h2>
            <p>
              {currState === "Login"
                ? "Please sign in to continue."
                : "Sign up to get started."}
            </p>
          </LoginHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginForm onSubmit={handleSubmit} noValidate>
            {currState === "Sign Up" && (
              <FormGroup>
                <InputWrapper>
                  <Input
                    id="name"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    type="text"
                    placeholder=" "
                    required
                  />
                  <Label htmlFor="name">Name</Label>
                </InputWrapper>
              </FormGroup>
            )}

            <FormGroup>
              <InputWrapper>
                <Input
                  id="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder=" "
                  required
                />
                <Label htmlFor="email">Email Address</Label>
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <PasswordInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  placeholder=" "
                  required
                />
                <Label htmlFor="password">Password</Label>
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <EyeIcon show={showPassword} />
                </PasswordToggle>
              </InputWrapper>
            </FormGroup>

            <LoginButton type="submit">
              <BtnText>{currState === "Login" ? "Sign In" : "Sign Up"}</BtnText>
            </LoginButton>
          </LoginForm>

          <SignupLink>
            {currState === "Login" ? (
              <>
                Don&apos;t have an account?{" "}
                <ToggleBtn onClick={() => setCurrState("Sign Up")}>Register now!</ToggleBtn>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <ToggleBtn onClick={() => setCurrState("Login")}>Login here</ToggleBtn>
              </>
            )}
          </SignupLink>
        </LoginCard>
      </LoginContainer>
    </LoginBody>
  );
};

export default Login;

// Styled Components
const LoginBody = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #334155;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }

  p {
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 4px;
  margin-left: 4px;
`;

const LoginForm = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const floatingLabel = css`
  top: -4px;
  left: 10px;
  font-size: 12px;
  color: #6366f1;
`;

const Input = styled.input`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px 8px 16px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #6366f1;
  }
  &:focus + label,
  &:not(:placeholder-shown) + label {
    ${floatingLabel}
  }
`;

const PasswordInput = styled(Input)``;

const Label = styled.label`
  position: absolute;
  top: 14px;
  left: 12px;
  color: #64748b;
  background-color: white;
  padding: 0 4px;
  font-size: 16px;
  pointer-events: none;
  transition: 0.2s ease all;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

const EyeIcon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-image 0.2s ease;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='1.5'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/%3e%3c/svg%3e");
  ${(props) =>
    props.show &&
    css`
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='1.5'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88'/%3e%3c/svg%3e");
    `}
`;

const LoginButton = styled.button`
  width: 100%;
  background: #6366f1;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  &:hover {
    background: #4f46e5;
  }
`;

const BtnText = styled.span``;

const SignupLink = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
`;

const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  cursor: pointer;
`;

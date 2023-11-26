import React from "react";
import img from "./img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Token } from "@mui/icons-material";

function SignInForm() {
    const Navigate = useNavigate();
    const [state, setState] = React.useState({
        email: "",
        password: "",
        rememberMe: false, // Added rememberMe state
    });

    // Load saved credentials from local storage on component mount
    React.useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const savedPassword = localStorage.getItem("rememberedPassword");

        if (savedEmail && savedPassword) {
            setState({
                ...state,
                email: savedEmail,
                password: savedPassword,
                rememberMe: true,
            });
        }
    }, []);

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value,
        });
    };

    const handleRememberMeChange = (evt) => {
        const isChecked = evt.target.checked;
        setState({
            ...state,
            rememberMe: isChecked,
        });
    };

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();
        const { email, password, rememberMe } = state;

        // Assuming you have an API call function for login
        try {
            // Make the API call to verify credentials
            // Replace the following line with your actual API call
            const response = await fetch("https://campusconnectbackend.onrender.com/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
                .then(response => response.json())
                .then(data => {
                    const token = data.token;
                    // Now you can use the token as needed
                    localStorage.setItem("Token", token);
                    console.log(token);

                    // If "Remember Me" is checked, save credentials to local storage
                    if (rememberMe) {
                        localStorage.setItem("rememberedEmail", email);
                        localStorage.setItem("rememberedPassword", password);
                    }
                    // console.log(response.json());
                    // console.log(data.token);

                    // Redirect to the Home page
                    Navigate("/Home");

                    // You can also perform a GET request here if needed

                })
                .catch(error => {
                    // Handle errors
                    alert("Invalid credentials. Please try again.");
                    console.error(error);
                });
            // Assuming the API returns a success status
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit} className="form">
                <div className="logo">
                    <p>
                        <img src={img} alt=" " /> Campus connect
                    </p>
                </div>
                <h1>Sign Into Your Account</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
                <div className="con">
                    <div className="remb">
                        <label className="label">
                            <input
                                type="checkbox"
                                className="remember"
                                id="remember"
                                checked={state.rememberMe}
                                onChange={handleRememberMeChange}
                            />{" "}
                            Remember Me
                        </label>
                    </div>
                    <div className="for-pa">
                        <Link to="/login/forgotpassword">Forgot password?</Link>
                    </div>
                </div>
                <button>Sign In</button>
                <div className="alt-s">
                    <span>OR</span>
                </div>
                <div className="social-container">
                    {/* <!-- <a href="#" class="social"><i className="fab fa-facebook-f"></i></a> --> */}
                    <a href="#" className="social">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#" className="social">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
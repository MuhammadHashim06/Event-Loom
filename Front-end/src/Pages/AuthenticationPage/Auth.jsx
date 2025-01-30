// // import { useState } from "react";
// // import "./Auth.css";

// // export default function Auth() {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [formData, setFormData] = useState({ email: "", password: "", name: "" });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log(isLogin ? "Logging in..." : "Signing up...", formData);
// //   };

// //   return (
// //     <div className="auth-container">
// //       <div className="auth-box">
// //         <h2>{isLogin ? "Login" : "Sign Up"}</h2>
// //         <form onSubmit={handleSubmit}>
// //           {!isLogin && (
// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Full Name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required
// //             />
// //           )}
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //           <button type="submit">
// //             {isLogin ? "Login" : "Sign Up"}
// //           </button>
// //         </form>
// //         <p>
// //           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
// //           <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
// //             {isLogin ? "Sign up" : "Login"}
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory in React Router v6
// import "./Auth.css";

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ email: "", password: "", name: "" });

//   const navigate = useNavigate(); // Initialize navigate for navigation

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(isLogin ? "Logging in..." : "Signing up...", formData);

//     if (isLogin) {
//       // Redirect to the event page if login is successful
//       navigate("/dashboard");
//     } else {
//       // Stay on the login page for signup (or show a message for now)
//       setIsLogin(true);
//       alert("Sign-up successful! Please log in.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>{isLogin ? "Login" : "Sign Up"}</h2>
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>
//         <p>
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
//             {isLogin ? "Sign up" : "Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory in React Router v6
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState(""); // To handle error messages

  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...", formData);

    const url = isLogin ? "http://localhost:5000/api/users/login" : "http://localhost:5000/api/users/register";
    const method = "POST";
    const body = JSON.stringify(formData);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();
      console.log("User Data :", data);
      sessionStorage.setItem("userData", JSON.stringify(data))

      if (!response.ok) {
        setError(data.message); // Display error message from backend
        return;
      }

      if (isLogin) {
        // Redirect to the dashboard if login is successful
        navigate("/dashboard");
      } else {
        // Stay on the login page for signup (or show a message for now)
        setIsLogin(true);
        alert("Sign-up successful! Please log in.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

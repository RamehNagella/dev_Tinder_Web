import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      const userData = res.data;
      dispatch(addUser(userData));

      return navigate("/");
    } catch (err) {
      setError(err.response.data?.error || "Login failed. Try again.");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));

      return navigate("/profile");
    } catch (err) {
      // setError(err?.response?.data || "Enter correct data.");
      setError(err?.response?.data?.error || "Signup failed.");

      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Header */}
      <header className="navbar bg-base-300 shadow-md px-6">
        <div className="flex-1">
          <span className="text-xl font-bold tracking-tight text-primary">
            ❤️Amigo
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="card bg-violet-900 w-full max-w-sm sm:max-w-md shadow-2xl border border-base-content/10">
          <div className="card-body gap-4 p-6 sm:p-8">
            {/* Title */}
            <div className="text-center mb-2">
              <div className="badge badge-primary badge-outline text-lg bg-base-200 text-white tracking-widest mb-3">
                {isLoginForm ? "WELCOME" : "GET STARTED"}
              </div>
              <h2 className="card-title justify-center text-2xl font-bold">
                {isLoginForm ? "Login" : "Create Account"}
              </h2>
              <p className="text-base-content/50 text-sm mt-1">
                {isLoginForm
                  ? "Enter your credentials to continue"
                  : "Fill in your details below"}
              </p>
            </div>

            {/* Name fields side by side on signup */}
            {!isLoginForm && (
              <div className="flex gap-3">
                <fieldset className="fieldset flex-1">
                  <legend className="fieldset-legend text-xs tracking-widest">
                    FIRST NAME
                  </legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full focus:input-primary"
                  />
                </fieldset>
                <fieldset className="fieldset flex-1">
                  <legend className="fieldset-legend text-xs tracking-widest">
                    LAST NAME
                  </legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full focus:input-primary"
                  />
                </fieldset>
              </div>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xs tracking-widest">
                EMAIL ADDRESS
              </legend>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full focus:input-primary"
                placeholder="you@example.com"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-xs tracking-widest">
                PASSWORD
              </legend>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full focus:input-primary"
                placeholder="••••••••"
              />
            </fieldset>

            {/* Error */}
            {error && (
              <div className="alert alert-error py-2 px-4 text-sm rounded-lg">
                <span>⚠ {error}</span>
              </div>
            )}

            {/* Button */}
            <div className="card-actions mt-2">
              <button
                className="btn btn-primary w-full"
                onClick={isLoginForm ? handleLogin : handleSignup}
              >
                {isLoginForm ? "Login →" : "Create Account →"}
              </button>
            </div>

            {/* Toggle */}
            <p className="text-center text-sm text-base-content/50">
              {isLoginForm
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                className="text-primary font-semibold cursor-pointer hover:underline underline-offset-2"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                {isLoginForm ? "Sign up" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
// /*
//   return (
//     <div className="flex justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-sm">
//         <div className="card-body justify-center m-2">
//           <h2 className="card-title justify-center">
//             {isLoginForm ? "Login" : "Signup"}
//           </h2>
//           {!isLoginForm && (
//             <>
//               <fieldset className="fieldset">
//                 <legend className="fieldset-legend">First Name </legend>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="input"
//                 />
//               </fieldset>
//               <fieldset className="fieldset">
//                 <legend className="fieldset-legend">Last Name </legend>
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="input"
//                 />
//               </fieldset>
//             </>
//           )}
//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Email ID </legend>
//             <input
//               type="text"
//               value={emailId}
//               onChange={(e) => setEmailId(e.target.value)}
//               className="input"
//             />
//           </fieldset>
//           <fieldset className="fieldset">
//             <legend className="fieldset-legend">Password</legend>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input"
//             />
//           </fieldset>
//           <p className="text-red-500">{error}</p>
//           <div className="card-actions justify-center m-2">
//             <button
//               className="btn btn-primary"
//               onClick={isLoginForm ? handleLogin : handleSignup}
//             >
//               {isLoginForm ? "Login" : "Signup"}
//             </button>
//           </div>
//           <p
//             className="m-auto cursor-pointer py-2"
//             onClick={() => setIsLoginForm((value) => !value)}
//           >
//             {isLoginForm
//               ? "New User? Signup here"
//               : "Existing User? Login Here "}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;
// */

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());

      return navigate("/login");
    } catch (err) {
      //Error logic redirect to error page
      console.error(err);
    }
  };
  return (
    <div className="navbar bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 shadow-sm px-2 sm:px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl sm:text-xl">
          ❤️Amigo
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="sm:block text-sm text-white">
            Welcome, {user.user?.firstName || user.firstName}
          </span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 sm:w-10 rounded-full ring ring-secondary ring-offset-base-600 ring-offset-2">
                <img
                  alt="user photo"
                  src={user.user?.photoUrl || user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
            >
              <li className="sm:hidden menu-title text-base-content/60 text-xs px-3 py-1">
                {user.user?.firstName || user.firstName}
              </li>
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <div className="divider my-0" />
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;

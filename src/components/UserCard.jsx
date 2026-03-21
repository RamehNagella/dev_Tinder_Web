import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { clearFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user, showActions = true }) => {
  // console.log(">>", user);
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(clearFeed(userId));
    } catch (err) {
      // console.error(err);
      setError(err?.response?.data || "Login failed. Try again.");
    }
  };
  return (
    <div className="card bg-gradient-to-br from-blue-400 via-teal-600 to-emerald-900 w-64 h-92 shadow-sm">
      <figure className="rounded-lg w-full h-full flex items-center justify-center overflow-hidden p-2 rounded-xl">
        <img src={photoUrl} alt="photo" className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p className="text-sm mt-1 max-h-16 overflow-y-auto scrollbar-thin scrollbar-thumb-base-content/20">
          {about}
        </p>
        {showActions && (
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;

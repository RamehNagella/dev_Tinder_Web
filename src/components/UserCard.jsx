import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { clearFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user, showActions = true }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(clearFeed(userId));
    } catch (err) {
      // console.error(err);
      setError(err?.response?.data || "Login failed. Try again.");
    }
  };
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
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

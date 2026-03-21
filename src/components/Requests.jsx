import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return "No Requests";
  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="text-6xl animate-bounce">🔗</div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          No Requests Found
        </h1>
        <p className="text-base-content/50 text-sm sm:text-base text-center max-w-xs">
          Start exploring and connect with people you vibe with!
        </p>
        <Link
          to="/"
          className="btn btn-sm sm:btn-md mt-2 bg-gradient-to-r from-secondary to-primary text-white border-none hover:opacity-90"
        >
          Find Your Amigo here{" "}
        </Link>
      </div>
    );
  return (
    <div className="text-center my-10">
      <div className="flex flex-col items-center justify-center -mt-2 gap-2">
        <div className="text-4xl animate-bounce">🔗</div>
        <h1 className="text-4xl sm:text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          Connection Requests
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3 overflow-y-auto max-h-[70vh] p-2">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center sm:items-center 
            gap-3 p-4 rounded-lg bg-base-300 w-full max-w-xl"
            >
              <div>
                <img
                  alt="photo"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                  src={photoUrl}
                />
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h2 className="font-bold text-lg sm:text-xl truncate">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p
                  className="text-sm mt-1 max-h-12 overflow-y-auto scrollbar-thin 
                     scrollbar-thumb-base-content/20 line-clamp-2"
                >
                  {about}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="btn btn-error btn-sm sm:btn-md"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success btn-sm sm:btn-md"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

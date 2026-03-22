import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const getFeed = async () => {
    if (feed && feed.length) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      setError(err.response?.data?.error || "Feed users failed. Try again.");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="text-6xl animate-bounce">🔗</div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          No New Friends Found!
        </h1>
      </div>
    );
  return (
    feed && (
      <div
        className="flex justify-center items-center px-0 overflow-hidden
          h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-6rem)]"
      >
        <div className="w-64 sm:w-70 md:w-82">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;

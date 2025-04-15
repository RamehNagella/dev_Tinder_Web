import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const getFeed = async () => {
    if (feed && feed.length) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true
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
    return <h1 className="flex justify-center my-10"> No New Users Found!</h1>;
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log("feed>>>", feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed && feed.length) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true
      });
      // console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      // console.error(err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return "No Users found!";
  if (feed.length < 0)
    return <h1 className="flex justify-center my-10"> No New Users Found!</h1>;
  return (
    feed &&
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

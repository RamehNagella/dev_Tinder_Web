import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      if (Array.isArray(res.data.data)) {
        dispatch(addConnections(res.data.data));
      } else {
        console.warn("Unexpected response structure:", res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="text-6xl animate-bounce">🔗</div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          No Connections Yet
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
    <div className="text-center my-10 px-4 flex flex-col items-center gap-2 p-2">
      <div className="flex flex-col items-center justify-center -mt-2 gap-2">
        <div className="text-4xl animate-bounce">🔗</div>
        <h1 className="text-4xl sm:text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          Connections
        </h1>
      </div>
      <div className="flex flex-col items-center gap-2 overflow-y-auto max-h-[70vh] p-2 scrollbar-thin p-12 ">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={_id}
              className=" flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-info via-primary to-warning w-full max-w-xl flex-shrink-0"
            >
              <div>
                <img
                  alt="photo"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                  src={photoUrl}
                />
              </div>
              <div className="text-left flex-1 min-w-0 mx-4">
                <h2 className="fonrt-bold text-lg sm:text-xl truncate">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-base-content/70">
                    {age + ", " + gender}
                  </p>
                )}
                <p className="text-sm mt-1 line-clamp-2">{about}</p>
              </div>

              <Link to={"/chat/" + _id} className="flex-shrink-0 ml-auto">
                <button className="btn btn-secondary btn-sm sm:btn-md text-xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-600">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
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
  if (!connections) return "No Connections";
  if (connections.length === 0) return <h1>You have No Connections</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold  text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 size rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="fonrt-bold text-xl">
                {firstName + " " + lastName}
              </h2>
            </div>
            <p>{about}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

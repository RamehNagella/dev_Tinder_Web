import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

// export const CreateSocketConnection = () => {
//   return io(BASE_URL);
// };

export const CreateSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
  } else {
    return io("/", {
      path: "/api/socket.io",
      transports: ["websocket", "polling"],
    });
  }
};

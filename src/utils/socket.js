import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const CreateSocketConnection = () => {
  return io("/", {
    transports: ["websocket", "polling"],
    withCredentials: true,
  });
};

// export const CreateSocketConnection = () => {
//   return io(BASE_URL);
// };

// export const CreateSocketConnection = () => {
//   console.log("path", location.hostname);

//   if (location.hostname === "localhost") {
//     return io(BASE_URL, {
//       transports: ["websocket", "polling"],
//       withCredentials: true,
//     });
//   } else {
//     return io("/", {
//       // path: "/api/socket.io",
//       transports: ["websocket", "polling"],
//       withCredentials: true,
//     });
//   }
// };

// export const CreateSocketConnection = () => {
//   const isLocal = window.location.hostname === "localhost";

//   return io(isLocal ? BASE_URL : "/", {
//     transports: ["websocket", "polling"],
//     withCredentials: true,
//   });
// };

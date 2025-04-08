import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* <Route path="/" element={<div>Base Page</div>} /> */}
            {/* <Route path="/login" element={<div>Login Page</div>} /> */}
            {/* <Route path="/test" element={<div> Test Page</div>} /> */}
          </Routes>
        </BrowserRouter>
        {/* <NavBar />
      <h1 className="text-3xl font-bold">Hello World!</h1> */}
      </Provider>
    </>
  );
}

export default App;

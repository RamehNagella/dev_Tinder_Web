import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./NavBar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
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
    </>
  );
}

export default App;

import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  // console.log("editProfile", user.user);
  // console.log("editProfile.user", user);

  const [firstName, setFirstName] = useState(
    user.user?.firstName || user?.firstName
  );
  const [lastName, setLastName] = useState(
    user.user?.lastName || user?.lastName
  );
  const [photoUrl, setPhotoUrl] = useState(
    user.user?.photoUrl || user?.photoUrl
  );
  const [age, setAge] = useState(user.user?.age || user?.age);
  const [gender, setGender] = useState(user.user?.gender || user?.gender);
  const [about, setAbout] = useState(user.user?.about || user?.about);

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    //clear Error
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about
        },
        { withCredentials: true }
      );

      // console.log("/profile/edit", res.data);
      // console.log("///>>", res.loggedInUser);
      dispatch(addUser(res.data?.loggedInUser));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body justify-center m-2">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name </legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input"
                />
              </fieldset>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primay" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

/*
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  // console.log("editProfile", user.user);
  // console.log("editProfile.user", user);

  const [firstName, setFirstName] = useState(
    user.user?.firstName || user?.firstName
  );
  const [lastName, setLastName] = useState(
    user.user?.lastName || user?.lastName
  );
  const [photoUrl, setPhotoUrl] = useState(
    user.user?.photoUrl || user?.photoUrl
  );
  const [age, setAge] = useState(user.user?.age || user?.age);
  const [gender, setGender] = useState(user.user?.gender || user?.gender);
  const [about, setAbout] = useState(user.user?.about || user?.about);

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    //clear Error
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about
        },
        { withCredentials: true }
      );

      // console.log("/profile/edit", res.data);
      // console.log("///>>", res.loggedInUser);
      dispatch(addUser(res.data?.loggedInUser));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body justify-center m-2">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name </legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input"
                />
              </fieldset>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primay" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
*/

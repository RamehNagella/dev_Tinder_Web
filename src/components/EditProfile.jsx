import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(
    user.user?.firstName || user?.firstName,
  );
  const [lastName, setLastName] = useState(
    user.user?.lastName || user?.lastName,
  );
  const [photoUrl, setPhotoUrl] = useState(
    user.user?.photoUrl || user?.photoUrl,
  );
  const [age, setAge] = useState(user.user?.age || user?.age || "");
  const [gender, setGender] = useState(user.user?.gender || user?.gender || "");
  const [about, setAbout] = useState(user.user?.about || user?.about || "");

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
          about,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data?.loggedInUser));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        return navigate("/");
      }, 5000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      {/* <div className="flex justify-center my-10"> */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 my-10 px-4 py-8">
        <div className="w-full max-w-sm flex justify-center">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
            showActions={false}
          />
        </div>
        {/* <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm"> */}
        <div className="card bg-gradient-to-br from-info via-primary to-warning w-full max-w-sm shadow-sm">
          <div className="card-body m-2">
            <div className="card-body justify-center m-2">
              <h1 className="card-title justify-center bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-700">
                Edit Profile
              </h1>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name </legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input w-full"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input w-full"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input w-full"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input w-full"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input w-full"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input w-full"
                />
              </fieldset>
              <p className="text-red-500 text-sm min-h-[1.25rem]">{error}</p>
              <div className="card-actions justify-center m-2">
                <button
                  className="btn btn-secondary w-full sm:w-auto"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
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

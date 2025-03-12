import BackButton from "../../Components/BackButton";
import { UserContext } from "../../Context/userContext";
import { useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import axios from "axios";

const EditProfilePage = () => {
  const { editProfile, loading, error } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    profilePic: "",
    coverPic: "",
    firstName: "",
    lastName: "",
    userName: "",
    age: "",
    email: "",
    bio: "",
    DOB: { day: "", month: "", year: "" },
    region: "",
    hobby: "",
    occupation: "",
    gender: "",
  });
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [coverPicPreview, setCoverPicPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser) {
      setUserInfo(storedUser);
      setProfilePicPreview(storedUser.profilePic);
      setCoverPicPreview(storedUser.coverPic);
    }
  },[]);

  const updateUserInfo = (field, value) => {
    setUserInfo((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: { ...prev[parent], [child]: value },
        };
      }
      return { ...prev, [field]: value };
    });
    setIsDirty(true);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const testFile = (file) => {
        const fileType = file['type'];
        const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
        return validImageTypes.includes(fileType);
    }
    if (!testFile(file)) {
        alert('Please upload a valid image or video file');
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        updateUserInfo("profilePic", file);
        setProfilePicPreview(reader.result);
    };
    reader.readAsDataURL(file);
};

const handleCoverPicChange = (e) => {
    const file = e.target.files[0];
    const testFile = (file) => {
        const fileType = file['type'];
        const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
        return validImageTypes.includes(fileType);
    }
    if (!testFile(file)) {
        alert('Please upload a valid image or video file');
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        updateUserInfo("coverPic", file);
        setCoverPicPreview(reader.result);
    };
    reader.readAsDataURL(file);
};


  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pymeet");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...userInfo };

    try {
      if (userInfo.profilePic instanceof File) {
        formData.profilePic = await uploadImage(userInfo.profilePic);
      }
      if (userInfo.coverPic instanceof File) {
        formData.coverPic = await uploadImage(userInfo.coverPic);
      }

      await editProfile(formData);
      setIsDirty(false);
      setMessage("Profile updated successfully");
      navigate("/UserProfile");
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  const handleDiscard = () => {
    if (isDirty) {
      const confirmDiscard = window.confirm(
        "Do you want to discard changes made to your profile?"
      );
      if (!confirmDiscard) {
        return;
      }
    }
    navigate(-1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {message && <p className="text-green-500">{message}</p>}

      <BackButton />
      <h3 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h3>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
      <div>  {/* Profile Picture */}
        <div className="w-1/2 mx-2">
          <label htmlFor="ProfilePic" className="block font-medium mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            name="ProfilePic"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
            onChange={handleProfilePicChange}
          />
          {profilePicPreview && (
            <img
              src={profilePicPreview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full mt-2"
            />
          )}
        </div>


        {/* Cover Picture */}
        <div className="w-1/2 mx-2">
          <label htmlFor="CoverPic" className="block font-medium mb-1">
            Cover Picture
          </label>
          <input
            type="file"
            name="CoverPic"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
            onChange={handleCoverPicChange}
          />
          {coverPicPreview && (
            <img
              src={coverPicPreview}
              alt="Cover Preview"
              className="w-32 h-32 object-cover mt-2 rounded-lg"
            />
          )}
        </div>
      </div>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={userInfo.firstName || ""}
            onChange={(e) => updateUserInfo("firstName", e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={userInfo.lastName || ""}
            onChange={(e) => updateUserInfo("lastName", e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        {/* Other Inputs */}
        <input
          type="text"
          placeholder="User Name"
          value={userInfo.userName || ""}
          onChange={(e) => updateUserInfo("userName", e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={userInfo.email || ""}
          onChange={(e) => updateUserInfo("email", e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <textarea
          placeholder="Bio"
          value={userInfo.bio || ""}
          onChange={(e) => updateUserInfo("bio", e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        ></textarea>
        <div className="flex items-center justify-between">
            <div className="w-1/2">
            <input type="number"
            className="w-full"
            placeholder="Your age"
            value={userInfo.age || 0}
            onChange={(e) => updateUserInfo('age', e.target.value)} required />
            </div>
            <div className="flex justify-between items-center w-1/2">
                <input className="w-1/3 mx-2" type="number" max="31"
                placeholder="DD"
                value={userInfo.DOB.day || 0 }
                onChange={(e) => updateUserInfo('DOB.day', e.target.value)} required />
                <input className="w-1/3 mx-2" type="number" max="12"
                placeholder="MM"
                value={userInfo.DOB.month || 0}
                onChange={(e) => updateUserInfo('DOB.month', e.target.value)} required />
                <input className="w-1/3 mx-2" type="number" max="9999"
                placeholder="YY"
                value={userInfo.DOB.year || 0}
                onChange={(e) => updateUserInfo('DOB.year', e.target.value)} required />
            </div>
        </div>
        <div>
            <input type="text"
            placeholder="Country"
            value={userInfo.region || ""}
            onChange={(e) => updateUserInfo('region', e.target.value)} required />
            <input type="text"
            placeholder="hobby"
            value={userInfo.hobby || ""}
            onChange={(e) => updateUserInfo('hobby', e.target.value)} required />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;

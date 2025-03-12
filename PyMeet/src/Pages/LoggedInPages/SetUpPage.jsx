import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Context/userContext";
import Loading from "../../Components/Loading";
import BackButton from "../../Components/BackButton";
import { uploadImage } from "../../Services/api";

const SetUpPage = () => {
    const { setUpProfile, loading, error } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({
        profilePic: '',
        coverPic: '',
        firstName: '',
        lastName: '',
        age: '',
        userName: '',
        bio: '',
        DOB: {
            day: '',
            month: '',
            year: ''
        },
        region: '',
        hobby: '',
        occupation: '',
        gender: ''
    });
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [coverPicPreview, setCoverPicPreview] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const updateUserInfo = (field, value) => {
        setUserInfo((prev) => {
            const fields = field.split('.');
            if (fields.length === 2) {
                return {
                    ...prev,
                    [fields[0]]: {
                        ...prev[fields[0]],
                        [fields[1]]: value
                    }
                };
            }
            return {
                ...prev,
                [field]: value
            };
        });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        const testFile = (file) => {
            const fileType = file['type'];
            const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
            return validImageTypes.includes(fileType);
        } 
        if (!testFile(file)) {
            alert('Please upload a valid image file (jpg, jpeg, png, gif)');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            updateUserInfo('profilePic', file);
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
            alert('Please upload a valid image file (jpg, jpeg, png, gif)');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            updateUserInfo('coverPic', file);
            setCoverPicPreview(reader.result);
        };
        reader.readAsDataURL(file);
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

            await setUpProfile(formData);
            setShowMessage(true);
            navigate('/UserProfile');
        } catch (error) {
            setMessage(error.message || 'An error occurred');
        }
    };

    

    return (
        <>
            {loading && <div><Loading /></div>}
            {error && <div><p>{error?.message || String(error)}</p></div>}
            {showMessage && <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
            </div> }
            {message && <p>{message}</p> }
            <div className="p-5 mt-12">
                <div className="flex items-center justify-evenly">
                    <BackButton />
                    <h3 className="text-blue-900 text-3xl">Welcome, Lets Set Up Your Account</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center p-2">
                        <div className={profilePicPreview ? `w-1/2 h-70 border rounded-lg p-5 mx-2` : `w-1/2 h-40 border rounded-lg p-5 mx-2`}>
                            
                            {profilePicPreview ? (
                                <img src={profilePicPreview} alt="Profile Preview" className="w-full h-40 mt-2" />
                            ) : 
                            (
                            <label htmlFor="ProfilePic" className="cursor-pointer flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                            </label>
                            )}
                            <input type="file"
                                id="ProfilePic"
                                name="ProfilePic"
                                className="hidden"
                                onChange={handleProfilePicChange}
                            />
                        </div>
                        <div className={coverPicPreview ? `w-1/2 h-70 border rounded-lg p-5 mx-2` : `w-1/2 h-40 border rounded-lg p-5 mx-2`}>
                            
                            {coverPicPreview ? (
                                <img src={coverPicPreview} alt="Cover Preview" className="w-full h-40 mt-2" />
                            ) : 
                            (
                            <label htmlFor="CoverPic" className="cursor-pointer flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                            </label>
                            )}
                            <input type="file"
                                id="CoverPic"
                                name="CoverPic"
                                className="hidden"
                                onChange={handleCoverPicChange}
                            />
                        </div>
                    </div>
                    <div>
                        <input type="text"
                            placeholder="Your First Name"
                            value={userInfo.firstName}
                            onChange={(e) => updateUserInfo('firstName', e.target.value)} required />
                        <input type="text"
                            placeholder="Your Last Name"
                            value={userInfo.lastName}
                            onChange={(e) => updateUserInfo('lastName', e.target.value)} required />
                    </div>
                    <div>
                        <input type="number"
                            placeholder="Your age"
                            value={userInfo.age}
                            onChange={(e) => updateUserInfo('age', e.target.value)} required />
                        <input type="text"
                            placeholder="@Your username"
                            value={userInfo.userName}
                            onChange={(e) => updateUserInfo('userName', e.target.value)} required />
                    </div>
                    <textarea cols="30" rows="10"
                        placeholder="Your description"
                        maxLength="200"
                        value={userInfo.bio}
                        onChange={(e) => updateUserInfo('bio', e.target.value)} required />
                    <div>
                        <input type="number" max="31"
                            placeholder="DD"
                            value={userInfo.DOB.day}
                            onChange={(e) => updateUserInfo('DOB.day', e.target.value)} required />
                        <input type="number" max="12"
                            placeholder="MM"
                            value={userInfo.DOB.month}
                            onChange={(e) => updateUserInfo('DOB.month', e.target.value)} required />
                        <input type="number" max="9999"
                            placeholder="YY"
                            value={userInfo.DOB.year}
                            onChange={(e) => updateUserInfo('DOB.year', e.target.value)} required />
                    </div>
                    <div>
                        <input type="text"
                            placeholder="Country"
                            value={userInfo.region}
                            onChange={(e) => updateUserInfo('region', e.target.value)} required />
                        <input type="text"
                            placeholder="hobby"
                            value={userInfo.hobby}
                            onChange={(e) => updateUserInfo('hobby', e.target.value)} required />
                    </div>
                    <div>
                        <input type="text"
                            placeholder="occupation"
                            value={userInfo.occupation}
                            onChange={(e) => updateUserInfo('occupation', e.target.value)} required />
                        <select
                            value={userInfo.gender}
                            onChange={(e) => updateUserInfo('gender', e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit"
                        className={!userInfo.firstName || !userInfo.lastName || !userInfo.age || !userInfo.userName || !userInfo.bio || !userInfo.DOB.day || !userInfo.DOB.month || !userInfo.DOB.year || !userInfo.region || !userInfo.hobby || !userInfo.occupation ? `py-3 px-7 backdrop-fil border rounded-lg text-xl  cursor-not-allowed` : `py-3 px-7 border rounded-lg text-xl cursor-pointer`}
                        disabled={!userInfo.firstName || !userInfo.lastName || !userInfo.age || !userInfo.userName || !userInfo.bio || !userInfo.DOB.day || !userInfo.DOB.month || !userInfo.DOB.year || !userInfo.region || !userInfo.hobby || !userInfo.occupation}
                    >Update</button>
                </form>
            </div>
        </>
    );
}

export default SetUpPage;
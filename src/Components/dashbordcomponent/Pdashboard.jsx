// Import necessary libraries and hooks
import { useState } from 'react';
import { motion } from 'framer-motion';
import AdditionalInformation from "./Pdprofile.jsx"
import { useSelector } from 'react-redux';

import { updatedetailsApi, updateprofileApi } from '../../Api/userApi';


const Pdashboard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useSelector(state => state.auth);
    const [userInfo, setUserInfo] = useState({
        name: user.FullName,
        email: user.email,
        phone: user.contact,
        gender: user.gender || "Male",
        city: user.address.city || "",
        area: user.address.street|| "",
        zip: user.address.zipcode|| "",
        state: user.address.state|| "",
       
        experience: [
            { position: 'N', company: '', startDate: '2021-01-01', endDate: '2023-01-01' }
        ]
    });
    const [editableUserInfo, setEditableUserInfo] = useState({ ...userInfo });
    const [profileImage, setProfileImage] = useState(user.profileimg);
    const [editableProfileImage, setEditableProfileImage] = useState(profileImage);

    // Handle input changes for editable user details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUserInfo({ ...editableUserInfo, [name]: value });
    };

    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setEditableProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Toggle editing mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditableUserInfo(userInfo); // Load current details into editable state
            setEditableProfileImage(profileImage); // Load current image into editable state
        }
    };

    // Save changes
    const saveChanges = async () => {
           try {
               const response = await updatedetailsApi(editableUserInfo);
              // if (!response.ok) throw new Error("Failed to update profile details");
       
               // const data = await response.json(); // Ensure response is JSON
               console.log("Profile updated:", response.data.data);
               setUserInfo(editableUserInfo);
               alert("Profile details updated successfully!");
       
               if (editableProfileImage) await uploadProfileImage();
       
               setIsEditing(false);
           } catch (error) {
               console.log("Error updating profile:", error);
               alert(error.message);
           }
       };
       
       
       const uploadProfileImage = async () => {
           const formData = new FormData();
           formData.append("profileimg", editableProfileImage);
       
           try {
               const response = await updateprofileApi(formData);
               const data = await response.json(); // Parse response
       
               if (!response.ok) throw new Error(data.message || "Failed to update profile image");
       
               alert("Profile image updated successfully!");
           } catch (error) {
               console.error("Error updating profile image:", error);
               alert(error.message);
           }
       };
    // Handle experience addition
    const addExperience = () => {
        setEditableUserInfo({
            ...editableUserInfo,
            experience: [
                ...editableUserInfo.experience,
                { position: '', company: '', startDate: '', endDate: '' }
            ]
        });
    };

    // Handle experience change
    const handleExperienceChange = (index, field, value) => {
        const updatedExperience = editableUserInfo.experience.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        );
        setEditableUserInfo({ ...editableUserInfo, experience: updatedExperience });
    };

    return (
        <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Profile Overview</h2>

            <div className="relative flex flex-col md:flex-row items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0 md:absolute md:right-0 md:top-0 md:m-6 md:text-center">
                    <img
                        src={isEditing ? editableProfileImage : profileImage}
                        alt="Profile"
                        className="rounded w-60 h-60 object-cover border-2 border-gray-200 shadow-md"
                    />
                    {isEditing && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-2"
                        />
                    )}
                </div>

                {/* User Details Form */}
                <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-2/3">
                    <div className="grid grid-cols-2 gap-4">
                        {/* User details fields */}
                        {Object.keys(userInfo).map((field) => (
                            field !== 'experience' && (
                                <div key={field} className="form-group">
                                    <label htmlFor={field} className="font-medium capitalize">
                                        {field}:
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id={field}
                                            name={field}
                                            className="form-control mt-1 border border-gray-300 rounded-md p-2"
                                            value={editableUserInfo[field]}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <p className="form-control mt-1 border bg-slate-50  rounded-md p-2">{userInfo[field]}</p>
                                    )}
                                </div>
                            )
                        ))}

                        {/* Experience Section */}
                        <div className="w-full">
                            <h3 className="font-medium text-lg mt-4">Experience</h3>
                            {editableUserInfo.experience.map((exp, index) => (
                                <div key={index} className="mb-4">
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Position"
                                                value={exp.position}
                                                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Company"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                                            />
                                            <input
                                                type="date"
                                                placeholder="Start Date"
                                                value={exp.startDate}
                                                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                                            />
                                            <input
                                                type="date"
                                                placeholder="End Date"
                                                value={exp.endDate}
                                                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                                className="mt-1 border border-gray-300 rounded-md p-2 w-full"
                                            />
                                        </>
                                    ) : (
                                        <p>{exp.position} at {exp.company} ({exp.startDate} - {exp.endDate})</p>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={addExperience}
                                    className="text-blue-500 underline mt-2"
                                >
                                    + Add Experience
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Edit and Save Button */}
                    <div className="flex justify-end mt-6">
                        {isEditing ? (
                            <button
                                type="button"
                                onClick={saveChanges}
                                className="px-6 py-2 font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none"
                            >
                                Save Changes
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={toggleEdit}
                                className="px-6 py-2 font-medium text-white bg-gray-500 rounded-md shadow hover:bg-gray-600 focus:outline-none"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </motion.div>
            <AdditionalInformation/>  
        </>
    );
};

export default Pdashboard;

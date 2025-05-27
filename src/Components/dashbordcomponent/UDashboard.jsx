// Import necessary libraries and hooks
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { updatedetailsApi, updateprofileApi } from '../../Api/userApi';

const UserProfile = () => {
    const { user } = useSelector(state => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: user.FullName,
        email: user.email,
        phone: user.contact,
        gender: user.gender,
        city: user.address.city,
        area: user.address.street,
        zip: user.address.zipcode,
        state: user.address.state,
    });

    const [editableUserInfo, setEditableUserInfo] = useState({ ...userInfo });
    const [profileImage, setProfileImage] = useState(user.profileimg);
    const [selectedFile, setSelectedFile] = useState(null); // Store selected file

    // Sync user info when user state changes
    useEffect(() => {
        setUserInfo({
            name: user.FullName,
            email: user.email,
            phone: user.contact,
            gender: user.gender,
            city: user.address.city,
            area: user.address.street,
            zip: user.address.zipcode,
            state: user.address.state,
        });
        setProfileImage(user.profileimg);
    }, [user]);

    // Handle input changes for editable user details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUserInfo({ ...editableUserInfo, [name]: value });
    };

    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setProfileImage(URL.createObjectURL(file)); // Preview the image
        }
    };

    // Toggle editing mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditableUserInfo(userInfo); // Reset to original details
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
    
            if (selectedFile) await uploadProfileImage();
    
            setIsEditing(false);
        } catch (error) {
            console.log("Error updating profile:", error);
            alert(error.message);
        }
    };
    
    
    const uploadProfileImage = async () => {
        const formData = new FormData();
        formData.append("profileimg", selectedFile);
    
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
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Profile Overview</h2>

            <div className="relative flex flex-col md:flex-row items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0 md:absolute md:right-0 md:top-0 md:m-6 text-center">
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="rounded w-60 h-60 object-cover border-2 border-gray-200 shadow-md"
                        />
                    </label>
                    {isEditing && (
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    )}
                </div>

                {/* User Details Form */}
                <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-2/3">
                    <div className="grid grid-cols-2 gap-4">
                        {Object.keys(userInfo).map((field) => (
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
                                    <h4 className="form-control mt-1 border bg-slate-50 rounded-md p-2">{userInfo[field]}</h4>
                                )}
                            </div>
                        ))}
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
    );
};

export default UserProfile;

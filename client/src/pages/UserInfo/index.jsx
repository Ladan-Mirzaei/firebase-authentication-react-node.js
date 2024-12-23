import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import UserProfileForm from "../../components/UserInfoForm/index.jsx";
import "./UserInfo.css";

export default function UserProfile() {
  const [userData, setUserData] = useState("null");
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  async function onFormSubmit(formData) {
    try {
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch userProfile ");

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
  if (userData) {
    return <Navigate to="/profile" />;
  }
  return (
    <>
      {" "}
      <div className="personal-container">
        <h2>Persönliche Angaben!</h2>
        <UserProfileForm onFormSubmit={onFormSubmit} />
      </div>
    </>
  );
}

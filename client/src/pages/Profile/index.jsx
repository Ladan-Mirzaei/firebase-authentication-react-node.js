import "./profile.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const { userData } = useAuth();
  const { user } = useContext(AuthContext);

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    async function loadUserData() {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log("Data fetching error");
          return;
        }

        const userDataFetch = await response.json();
        setProfileData(userDataFetch);
      } catch (err) {
        console.log(err);
      }
    }

    loadUserData();
  }, [user, API_URL]);
  return (
    <div className="profile-container">
      <div className="profile-privat">
        <div className="profile-info">
          {Array.isArray(profileData) &&
            profileData.map((item) => (
              <div key={item.uid}>
                {item.gender === "weiblich" ? (
                  <div className="female-profile">
                    <p>Willkommen, weiblicher Nutzer!</p>
                  </div>
                ) : (
                  <div className="male-profile">
                    <p>Willkommen, männlicher Nutzer!</p>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="profile-userInfo">
          <h3>Über mich</h3>
          <h3>
            Willkommen,
            {userData?.firstName} {userData?.lastName || ""}!
          </h3>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

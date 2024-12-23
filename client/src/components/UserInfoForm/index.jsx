import { useState, useContext } from "react";
import "./UserInfo.css";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function UserInfoForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    date_of_birth: "",
    gender: "",
  });

  const { user } = useContext(AuthContext);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleGenderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date_of_birth">Geburtsdatum*</label>
        <input
          type="date"
          id="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleFormChange}
        />

        <label htmlFor="gender">Geschlecht *</label>
        <br />
        <br />
        <select
          id="gender"
          value={formData.gender}
          onChange={handleGenderChange}
        >
          <option value="">Bitte auswählen</option>
          <option value="männlich">Männlich</option>
          <option value="weiblich">Weiblich</option>
          <option value="divers">Divers</option>
        </select>

        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
}

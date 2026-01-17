import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createHabit } from "../services/HabitServices";
import { useProfile } from "../context/ProfileContext";

export default function CreateHabitForm() {
  const { profile, hasLoaded, loadProfile } = useProfile();

  const [habitTitle, setHabitTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState<number>(1);

  const navigate = useNavigate();

  const handleHabitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reward = Number(xpReward);
    if (!habitTitle.trim() || !xpReward) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Please fill out all requiered fields",
      });
      return;
    }
    try {
      const data = await createHabit(habitTitle, description, reward);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `${habitTitle} has been created`,
      });
      loadProfile();
      navigate("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || error.message || "Sign Up Failed",
      });
    }
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleHabitSubmit}>
        <span className="title">Create a Habit</span>

        <div className="form-container">
          <div className="form-group">
            <label>Habit Title</label>
            <input
              type="text"
              required
              className="input"
              value={habitTitle}
              onChange={(e) => setHabitTitle(e.target.value)}
              placeholder="Habit Title"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          <div className="form-group">
            <label>Xp Reward</label>
            <select
              className="input"
              required
              value={xpReward}
              onChange={(e) => setXpReward(Number(e.target.value))}
            >
              <option value="" disabled>
                Select XP
              </option>

              {[1, 2, 3, 4, 5].map((xp) => (
                <option key={xp} value={xp}>
                  {xp} XP
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="d-flex justify-content-between px-4">
          <Button className="create-btn" type="submit">
            Create
          </Button>
          <Button
            className="cancel-btn"
            onClick={() => navigate("/dashboard")}
            variant="Danger"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

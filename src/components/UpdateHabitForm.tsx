import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getHabitbyId, updateHabit } from "../services/HabitServices";
import { useProfile } from "../context/ProfileContext";

export default function UpdateHabitForm() {
  const { habit_id } = useParams();
  const navigate = useNavigate();

  const { profile, hasLoaded, loadProfile } = useProfile();

  const [habitTitle, setHabitTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState<number>(1);
  const [active, setActive] = useState<boolean>(true);

  const loadHabit = async () => {
    try {
      const habit = await getHabitbyId(habit_id!);

      setHabitTitle(habit.title);
      setDescription(habit.description);
      setXpReward(habit.xp_reward);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Habit not loaded",
      });
      navigate("/dashboard");
    }
  };

  const handelUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateHabit(
        habit_id!,
        habitTitle,
        description,
        xpReward,
        active
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.message,
      });
      loadProfile();
      navigate("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    if (!habit_id) return;
    loadHabit();
  }, [habit_id]);

  return (
    <div className="form-box">
      <form className="form" onSubmit={handelUpdate}>
        <span className="title">Update a Habit</span>

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
          <Button className="update-btn" type="submit">
            Update
          </Button>
          <Button className="cancel-btn" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

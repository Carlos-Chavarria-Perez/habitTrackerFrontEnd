import React from "react";
import { Card, Button } from "react-bootstrap";
import type { Profile } from "../types/Profile";
import "../styles/HabitCard.css";
import ProgressBar from "./ProgressBar";
import { BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";

interface HabitCardProps {
  habit: Profile;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isProcessing: boolean
}

export default function HabitCard({
  habit,
  onComplete,
  onDelete,
  onEdit,
  isProcessing,
}: HabitCardProps) {
  return (
    <Card className="habit-card">
      <Card.Body className="d-flex flex-column">

        <div className="card-header-row">
          <Card.Title className="text-decoration-underline habit-title">
            {habit.title}
          </Card.Title>
          <div className=" btn-group">
            <button className="btn edit-btn" onClick={onEdit}>
              <BsPencilSquare />
            </button>
            <button className="btn delete-btn" onClick={onDelete}>
              <BsFillTrash3Fill />
            </button>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-2">

        </div>

        <Card.Text>
          <strong>Level:</strong> {habit.lvl} <br />
          <strong>Reward:</strong> {habit.xp_reward}
        </Card.Text>
        <div>
          <ProgressBar
            total_xp={habit.total_xp}
            next_level_required_xp={habit.next_level_required_xp}
          />
          <div className="mt-1">
            {habit.total_xp}/{habit.next_level_required_xp}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button className="complete-btn" onClick={onComplete} disabled={isProcessing}>
            {isProcessing? "Saving" : "Complete Habit"}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

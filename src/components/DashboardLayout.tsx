// import { useState } from "react";
import HabitCard from "./HabitCard";
import { useNavigate } from "react-router-dom";
import { completeHabit, deleteHabit } from "../services/HabitServices";
import Swal from "sweetalert2";
import { useProfile } from "../context/ProfileContext";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useLevel } from "../context/LevelContext";
import { useEffect, useState } from "react";
import LevelUp from "./LevelUp";
import ConfetiUI from "./Confeti";

export default function DashboardLayout() {
  const { profile, hasLoaded, loadProfile } = useProfile();
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [currentLevelUp, setCurrentLevelUp] = useState<{
    title: string | null;
    oldLevel: number;
    newLevel: number;
  } | null>(null);
  const { levelUps, clearLevelUps } = useLevel();
  const [pendingCompletion, setPendingCompletion] = useState(false);
  const [processingHabitId, setProcessingHabitId]= useState<string|null>(null)

  const navigate = useNavigate();

  // const loadProfile = async () => {
  //   showLoader();
  //   try {
  //     const res = await getProfile();
  //     setProfile(res.data);
  //   } catch (err) {
  //     console.error("Error loading profile:", err);
  //   } finally {
  //     hideLoader();
  //     setHasLoaded(true);
  //   }
  // };

  const handelComplete = async (habit_id: string) => {
    try {
      setProcessingHabitId(habit_id)
      await completeHabit(habit_id);
      setPendingCompletion(true);
      await loadProfile();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error.message,
      });
    } finally{
      setProcessingHabitId(null)
    }
  };

  const handelDelete = async (habit_id: string) => {
    try {
      const res = await deleteHabit(habit_id);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.message,
      });
      loadProfile();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error.message,
      });
    }
  };
  useEffect(() => {
    if (!pendingCompletion) return;
    if (levelUps.length) {
      const { title, oldLevel, newLevel } = levelUps[0];
      setCurrentLevelUp({ title, oldLevel, newLevel });
      setShowLevelModal(true);
      clearLevelUps();
    } else {
      Swal.fire({
        icon: "success",
        title: "Progress Recorded",
        text: "Your habit progress has been saved!",
      });
    }
    setPendingCompletion(false);
  }, [levelUps]);

  return (
    <Container className="flex-grow-1">
      {!hasLoaded ? null : profile.length > 0 ? (
        <Row>
          {profile.map((habit) => (
            <Col
              className="mt-3 d-flex justify-content-center"
              key={habit.habit_id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
            >
              <HabitCard
                habit={habit}
                onComplete={() => handelComplete(habit.habit_id)}
                onDelete={() => handelDelete(habit.habit_id)}
                onEdit={() => navigate(`/edit/${habit.habit_id}`)}
                isProcessing={processingHabitId === habit.habit_id}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center text-center"
          style={{ minHeight: "60dvh" }}
        >
          <h2>
            No habits found.
            <br />
            Add a new habit to get started!
          </h2>
        </div>
      )}

      <Modal
        show={showLevelModal}
        onHide={() => setShowLevelModal(false)}
        centered
      >
        <ConfetiUI />

        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center text-center">
            Level Up!
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center mb-3">
          <div>
            <h4>{currentLevelUp?.title ?? "Habit"}</h4>
          </div>
          <div className="pb-2 mb-4">
            Level {currentLevelUp?.oldLevel} →{" "}
            <strong>{currentLevelUp?.newLevel}</strong>
          </div>
          <div className="mt-4 mb-4">
            <LevelUp />
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

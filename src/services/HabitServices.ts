import api from "../API/axios";

export const createHabit = async (
  title: string,
  description: string,
  xp_reward: number
) => {
  try {
    const res = await api.post("/habits/createhabit", {
      title,
      description,
      xp_reward,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error Creating Habit");
  }
};

export const completeHabit = async (habit_id: string) => {
  try {
    const res = await api.post(`/habits/complete/${habit_id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Progess not recorded");
  }
};

export const deleteHabit = async (habit_id: string) => {
  try {
    const res = await api.delete(`/habits/delete/${habit_id}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Habit not deleted");
  }
};

export const getHabitbyId = async (habit_id: string) => {

  const res = await api.get(`/habits/${habit_id}`);
  return res.data.data;
};

export const updateHabit = async (
  habit_id: string,
  title: string,
  description: string,
  xp_reward: number,
  active:boolean
) => {
  const res = await api.patch(`habits/edit/${habit_id}`,{
    title,
    description,
    xp_reward,
    active
  });
  return res.data;
};

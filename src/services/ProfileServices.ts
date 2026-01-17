import api from "../API/axios"

export const getProfile = async () => {
  try {
    const res = await api.get("/users/getprofile");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to fetch profile");
  }}
import api from "../API/axios";
import type { LoginResponse } from "../types/Auth";

export const signup = async (username: string, password: string) => {
  try {
    // add a leading slash so axios resolves to http://localhost:3000/api/users/signup
    const res = await api.post("/users/signup", { username, password });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Sign Up Failed");
  }
};

export const login = async (username: string, password: string):Promise<LoginResponse> => {
  try {
    const res = await api.post("/users/login", { username, password });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failled to sign in");
  }
};

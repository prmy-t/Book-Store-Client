import axios from "axios";

export const postAddBook = async (data) => {
  return await axios.post("http://localhost:3000/add-book", { ...data });
};

export const signUp = async (data) => {
  return await axios.post("http://localhost:3000/sign-up", { ...data });
};

export const login = async (data) => {
  return await axios.post("http://localhost:3000/login", { ...data });
};

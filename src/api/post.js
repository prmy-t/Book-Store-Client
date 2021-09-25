import axios from "axios";

export async function postAddBook(data) {
  return await axios.post("http://localhost:3000/add-book", { ...data });
}

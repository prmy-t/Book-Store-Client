import axios from "axios";

export async function getNavbarData() {
  const res = await axios.get("http://localhost:3000/get-categories");
  if (res.data.error) return "error";
  else {
    const data = res.data;
    const categories = [];
    const authors = [];
    data.forEach((ele) => {
      if (!categories.includes(ele.category)) categories.push(ele.category);
      if (!authors.includes(ele.author)) authors.push(ele.author);
    });

    return { categories, authors };
  }
}
export async function booksByCategory(category) {
  return await axios.get(
    `http://localhost:3000/category/?category=${category}`
  );
}
export async function booksByAuthor(author) {
  return await axios.get(`http://localhost:3000/author/?author=${author}`);
}
export async function getSingleBook(bookId) {
  return await axios.get(`http://localhost:3000/?bookId=${bookId}`);
}

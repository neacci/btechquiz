import axios from "axios";
import { toast } from "react-toastify";

export const generateOptions = (bodyText) => {
  const lines = bodyText.split("\n").slice(0, 4);

  return ["A", "B", "C", "D"].map(
    (letter, index) => `${letter}. ${lines[index] || ""}`
  );
};
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data.slice(0, 10).map((item) => ({
      question: item.title,
      options: generateOptions(item.body),
    }));
  } catch (error) {
    toast("Error fetching data.", {
      type: "error",
      theme: "dark",
      position: "top-center",
      autoClose: 2500,
    });
    console.error("Error fetching data:", error);
    return null;
  }
};

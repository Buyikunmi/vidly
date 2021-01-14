import axios from "axios";

export async function getGenres() {
  const { data } = await axios.get("http://localhost:3900/api/movies");
  console.log(data);
  return data;
}

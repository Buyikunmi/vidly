import axios from "axios";

export async function getMovies() {
  const { data } = axios.get("http://localhost:3900/api/movies");
  return data;
}

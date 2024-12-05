import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import WatchedList from "./components/WatchedList";
import Logo from "./components/Logo";
import SearchInputMovie from "./components/SearchInputMovie";
import FoundResult from "./components/FoundResult";

const tempMovieData = [
  {
    imdbID: "tt15398776",
    Title: "Oppenheimer",
    Year: "2013",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1517268",
    Title: "Barbie",
    Year: "2023",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  },
  {
    imdbID: "tt8589698",
    Title: "Teenage Mutant Ninja Turtles: Mutant Mayhem",
    Year: "2023",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
  },
];

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <Navbar>
        <Logo />
        <SearchInputMovie />
        <FoundResult movies={movies} />
      </Navbar>
      <Main>
        <MovieList movies={movies} />
        <WatchedList />
      </Main>

    </>
  );
}
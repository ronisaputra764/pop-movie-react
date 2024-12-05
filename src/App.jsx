import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import WatchedList from "./components/WatchedList";
import BoxMovies from "./components/BoxMovies";
import Logo from "./components/Logo";
import SearchInputMovie from "./components/SearchInputMovie";
import FoundResult from "./components/FoundResult";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";


const API_KEY = "1b043d66"

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("oppenheimer")
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  function handleSelectMovieId(id) {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id))
  }

  function handleCloseMovie() {
    setSelectedMovieId(null)
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id))
  }

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true)
      try {
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        if (!res.ok) throw new Error("Something Went Wrong!")

        const data = await res.json()
        if (data.Response === "False") throw new Error(data.error)

        setMovies(data.Search)
        setError("")

      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError("")
      return;
    }

    fetchMovie()
  }, [query])



  return (
    <>
      <Navbar>
        <Logo />
        <SearchInputMovie query={query} setQuery={setQuery} />
        <FoundResult movies={movies} />
      </Navbar>
      <Main>
        {error && <ErrorMessage message={error} />}
        {!error && <MovieList movies={movies} isLoading={isLoading} onSelectMovieId={handleSelectMovieId} />}
        <BoxMovies>
          {selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              API_KEY={API_KEY}
              onAddWatch={handleAddWatched}
              watched={watched}
            />) :
            <WatchedList movie={movies} watched={watched} onDeleteWatched={handleDeleteWatched} />}
        </BoxMovies>
      </Main>

    </>
  );
}
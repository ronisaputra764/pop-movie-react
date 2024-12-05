import { useEffect, useState } from "react"
import StarRating from "../StarRating"
import Loader from "./Loader"

export default function MovieDetail({ selectedId, onCloseMovie, API_KEY, onAddWatch, watched, }) {
    const [movie, setMovie] = useState()
    const [userRating, setUserRating] = useState(0)
    const [isLoading, setIsloading] = useState(false)

    const isWatched = watched.some((movie) => movie.imdbId === selectedId)
    const userRatingWatched = watched.find((movie) => movie.imdbId === selectedId)?.userRating


    // const {
    //     Title: title,
    //     Year: year,
    //     Released: released,
    //     Poster: poster,
    //     imdbRating,
    //     Runtime: runtime,
    //     Plot: plot,
    //     Genre: genre,
    //     Actors: actors,
    //     Director: director,
    // } = movie;

    function handleAddWatched() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            imdbRating: Number(movie.imdbRating),
            runtime: Number(movie.Runtime.split(' ').at(0)),
            userRating: Number(userRating)
        }
        onAddWatch(newWatchedMovie)
        onCloseMovie()
    }

    useEffect(() => {
        async function getMovieDetails() {
            setIsloading(true)
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`)

            const data = await response.json()

            setMovie(data)
            setIsloading(false)
        }
        getMovieDetails()
    }, [selectedId])


    useEffect(() => {
        if (!movie) return;

        document.title = `PopMovie | ${movie?.Title}`

        return function () {
            document.title = "PopMovie"
        }
    }, [movie?.Title])


    return (
        <div className="details">
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>⬅</button>
                        <img src={movie?.Poster} alt={movie?.Title} />
                        <div className="details-overview">
                            <h2>{movie?.Title}</h2>
                            <p>
                                <span><i className="fa-solid fa-calendar-days" style={{ color: "#245d89" }}></i></span>
                                <span>{movie?.Released}</span>
                            </p>
                            <p>
                                <span><i className="fa-solid fa-hourglass-start" style={{ color: "#B197FC" }}></i></span>
                                <span>{movie?.Runtime}</span>
                            </p>
                            <p>
                                <span><i className="fa-solid fa-star" style={{ color: "#ffd43b" }}></i></span>
                                <span>{movie?.imdbRating}</span>
                            </p>
                        </div>
                    </header>

                    <section>
                        <p>
                            <em>{movie?.Plot}</em>
                        </p>
                        <p>Genre: {movie?.Genre}</p>
                        <p>Starring: {movie?.Actors}</p>
                        <p>Directed by: {movie?.Director}</p>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating max={10} size={24} color={"#fcc419"} onSetRating={setUserRating} />
                                    {!userRating > 0 ? (
                                        <button disabled className="btn-disabled">Rating the Star for add to Watched</button>
                                    ) : (<button className="btn-add" onClick={handleAddWatched}>+ Add to Watched</button>)}
                                </>)
                                : (
                                    <p>You have Watched this movie with a rating of {" "}
                                        {userRatingWatched} / 10
                                    </p>)}
                        </div>
                    </section>
                </>
            }

        </div>
    )
}
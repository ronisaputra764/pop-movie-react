
// const tempWatchedData = [
//     {
//         imdbID: "tt15398776",
//         Title: "Oppenheimer",
//         Year: "2013",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
//         runtime: 180,
//         imdbRating: 8.6,
//         userRating: 10,
//     },
//     {
//         imdbID: "tt1517268",
//         Title: "Barbie",
//         Year: "2023",
//         Poster:
//             "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
//         runtime: 114,
//         imdbRating: 7.2,
//         userRating: 8,
//     },
// ];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedList({ watched, onDeleteWatched }) {


    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <>
            <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                    <p>
                        <span></span>
                        <span>{watched.length} movies</span>
                    </p>
                    <p>
                        <span><i className="fa-solid fa-film" style={{ color: "#245d89" }}></i></span>
                        <span>{avgImdbRating.toFixed(1)}</span>
                    </p>
                    <p>
                        <span><i className="fa-solid fa-star" style={{ color: "#ffd43b" }}></i></span>
                        <span>{avgUserRating.toFixed(1)}</span>
                    </p>
                    <p>
                        <span><i className="fa-solid fa-hourglass-start" style={{ color: "#B197FC" }}></i></span>
                        <span>{Math.trunc(avgRuntime)} min</span>
                    </p>
                </div>
            </div>

            <ul className="list">
                {watched.map((movie) => (
                    <li key={movie.imdbId}>
                        <img src={movie.poster} alt={`${movie.title} poster`} />
                        <h3>{movie.title}</h3>
                        <div>
                            <p>
                                <span><i className="fa-solid fa-film" style={{ color: "#245d89" }}></i></span>
                                <span>{movie.imdbRating}</span>
                            </p>
                            <p>
                                <span><i className="fa-solid fa-star" style={{ color: "#ffd43b" }}></i></span>
                                <span>{movie.userRating}</span>
                            </p>
                            <p>
                                <span><i className="fa-solid fa-hourglass-start" style={{ color: "#B197FC" }}></i></span>
                                <span>{movie.runtime} min</span>
                            </p>
                            <button
                                className="btn-delete"
                                onClick={() => onDeleteWatched(movie.imdbId)}
                            >
                                x
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
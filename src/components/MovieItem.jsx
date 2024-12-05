export default function MovieItem({ movie, onSelectMovieId }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovieId(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>

                    <span><i className="fa-solid fa-calendar-days" style={{ color: "#245d89" }}></i></span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}
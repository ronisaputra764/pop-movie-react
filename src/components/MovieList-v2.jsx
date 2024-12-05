import { useState } from "react"
import Loader from "./Loader";

export default function MovieList({ movies, isLoading }) {

    const [isOpen1, setIsOpen1] = useState(true);
    const [animationClass, setAnimationClass] = useState("");

    const toggleList = () => {
        if (isOpen1) {
            // Animasi keluar
            setAnimationClass("animate__animated animate__slideOutUp");
            setTimeout(() => {
                setIsOpen1(false); // Setelah animasi selesai, tutup elemen
            }, 1000); // Durasi harus sama dengan durasi animasi
        } else {
            // Buka elemen dengan animasi masuk
            setIsOpen1(true);
            setAnimationClass("animate__animated animate__slideInDown");
        }
    };

    return (
        <div className="box">
            {isLoading ? <Loader /> :
                <div>
                    <button
                        className="btn-toggle"
                        onClick={toggleList}
                    >
                        {isOpen1 ? "–" : "+"}
                    </button>
                    {isOpen1 && (
                        <ul className={`list ${animationClass}`}>
                            {movies?.map((movie) => (
                                <li key={movie.imdbID}>
                                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                    <h3>{movie.Title}</h3>
                                    <div>
                                        <p>
                                            <span>📅</span>
                                            <span>{movie.Year}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>}
        </div>
    )
}
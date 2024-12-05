import { useState } from "react"
import Loader from "./Loader";
import MovieItem from "./MovieItem";

export default function MovieList({ movies, isLoading, onSelectMovieId }) {

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
            {isLoading && <Loader />}
            <div>
                <button
                    className="btn-toggle"
                    onClick={toggleList}
                >
                    {isOpen1 ? "–" : "+"}
                </button>
                {isOpen1 && (
                    <ul className={`list list-movies ${animationClass}`}>
                        {movies?.map((movie, index) => (
                            <MovieItem key={index} movie={movie} onSelectMovieId={onSelectMovieId} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
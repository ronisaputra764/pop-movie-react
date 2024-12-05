import { useState } from "react";

export default function BoxMovies({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [animationClass, setAnimationClass] = useState("");

    const toggleList = () => {
        if (isOpen) {
            // Animasi keluar
            setAnimationClass("animate__animated animate__slideOutUp");
            setTimeout(() => {
                setIsOpen(false); // Setelah animasi selesai, tutup elemen
            }, 1000); // Durasi harus sama dengan durasi animasi
        } else {
            // Buka elemen dengan animasi masuk
            setIsOpen(true);
            setAnimationClass("animate__animated animate__slideInDown");
        }
    };

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={toggleList}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && <div className={animationClass}>{children}</div>}
        </div>
    );
}
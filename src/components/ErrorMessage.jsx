export default function ErrorMessage({ message }) {
    return (
        <div className="error box">
            <span>⛔️</span> {message}
        </div>
    )
}
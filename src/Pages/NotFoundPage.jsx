export default function NotFoundPage({ setPage }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-3">404</h1>
      <p className="text-gray-400 text-base mb-6">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => setPage("home")}
        className="btn btn-primary rounded-full px-8"
      >
        Go Back Home
      </button>
    </div>
  );
}
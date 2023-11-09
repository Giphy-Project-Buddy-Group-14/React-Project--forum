
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 w-full bg-gray-800 py-4 text-white">
        <div className="flex justify-center space-x-6">
          <Link
            to="https://www.facebook.com/your-facebook-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook text-2xl"></i>
          </Link>
          <Link
            to="https://www.instagram.com/your-instagram-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </Link>
          <Link
            to="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github text-2xl"></i>
          </Link>
        </div>
        <div className="text-center mt-2">&copy; 2023 Telerik Group 14</div>
      </footer>
    </>
  );
}

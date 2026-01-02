import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { items } = useSelector((state: any) => state.favorites);
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Products
            </Link>
            <Link to="/favorites" className="nav-link">
              Favorites
              <span className="favorites-count">{items.length}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

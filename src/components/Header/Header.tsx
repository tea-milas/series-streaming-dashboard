import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav>
        <h1 className="title" onClick={() => navigate("/")}>
          Sav State
        </h1>
        <SearchBar />
      </nav>
    </header>
  );
};

export default Header;

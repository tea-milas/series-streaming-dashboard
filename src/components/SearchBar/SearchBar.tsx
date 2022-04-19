import { useContext } from "react";
import { SeriesContext } from "../../context/SeriesContext";
import "./SearchBar.css";

const SearchBar = () => {
  const seriesContext = useContext(SeriesContext);
  const { setSearchKey, search } = seriesContext;

  return (
    <form className="search" onSubmit={(e) => search(e)}>
      <input
        className="search_input"
        type="text"
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Search..."
      />
      <button className="search_button" type="submit">
        🔎
      </button>
    </form>
  );
};

export default SearchBar;

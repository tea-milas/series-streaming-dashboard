import { useContext } from "react";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import { SeriesContext } from "../../context/SeriesContext";

const SearchResults = () => {
  const seriesContext = useContext(SeriesContext);
  const { viewShow, searchResults } = seriesContext;

  return (
    <section className="dashboard">
      {searchResults &&
        searchResults.map(
          (item, i: number) =>
            i < 15 && (
              <MoviePoster
                url={item.show.image ? item.show.image.medium : null}
                alt={item.show.name}
                viewShow={() => viewShow(item.show.id)}
                isEpisode={false}
                key={i}
              />
            )
        )}
    </section>
  );
};

export default SearchResults;

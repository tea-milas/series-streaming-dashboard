import MoviePoster from "../MoviePoster/MoviePoster";
import placeholder from "../../assets/placeholder-image.png";

import "./Season.css";

const Season = (props) => {
  const { season, episodes } = props;

  return (
    <article className="season">
      <h3>Season {season}</h3>
      <div className="episodes">
        {episodes.map((ep) => (
          <MoviePoster
            url={ep.image === null ? placeholder : ep.image.medium}
            alt={ep.name}
            isEpisode={true}
            key={ep.id}
          />
        ))}
      </div>
    </article>
  );
};

export default Season;

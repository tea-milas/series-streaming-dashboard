import "./MoviePoster.css";

interface IPoster {
  url: string;
  alt: string;
  viewShow: () => void;
  isEpisode: boolean;
}

const MoviePoster = (props: IPoster) => {
  const { url, alt, viewShow, isEpisode } = props;
  return (
    <img
      className={`poster ${isEpisode && "poster--landscape"}`}
      src={url}
      alt={alt}
      onClick={isEpisode ? null : viewShow}
    />
  );
};

export default MoviePoster;

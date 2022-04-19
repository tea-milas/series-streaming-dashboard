import React from "react";
import Season from "../../components/Season/Season";
import { useContext } from "react";
import { SeriesContext } from "../../context/SeriesContext";
import "./Series.css";

const Series = () => {
  const seriesContext = useContext(SeriesContext);
  const { showInfo, episodes, seasons } = seriesContext;

  const stringToHTML = (str: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.documentElement.textContent;
  };

  return (
    <section>
      {showInfo && (
        <article>
          {" "}
          <img
            src={showInfo.image.medium ? showInfo.image.medium : ""}
            alt={showInfo.name}
          />
          <div className="info">
            <h1>
              {showInfo.name} (
              {showInfo.ended === null
                ? showInfo.premiered.slice(0, 4) ===
                  new Date().getFullYear().toString()
                  ? new Date().getFullYear()
                  : showInfo.premiered.slice(0, 4) +
                    "-" +
                    new Date().getFullYear()
                : showInfo.premiered.slice(0, 4) === showInfo.ended.slice(0, 4)
                ? showInfo.premiered.slice(0, 4)
                : showInfo.premiered.slice(0, 4) +
                  "-" +
                  showInfo.ended.slice(0, 4)}
              )
            </h1>

            {stringToHTML(showInfo.summary)}

            <p>
              <b>Cast: </b>{" "}
              {showInfo._embedded.cast.map((actor, i: number) =>
                i < showInfo._embedded.cast.length - 1
                  ? `${actor.person.name}, `
                  : actor.person.name
              )}
            </p>
            <p>
              <b>Status: </b> {showInfo.status}
            </p>
            <p>
              <b>Genres: </b>{" "}
              {showInfo.genres.map((genre: string, i: number) =>
                i < showInfo.genres.length - 1 ? `${genre}, ` : genre
              )}
            </p>
          </div>
        </article>
      )}

      {seasons.map((season) => (
        <Season
          season={season}
          episodes={episodes.filter((ep) => ep.season === season)}
          key={"season" + season}
        />
      ))}
    </section>
  );
};

export default Series;

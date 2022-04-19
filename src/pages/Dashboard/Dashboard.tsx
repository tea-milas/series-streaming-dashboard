import "./Dashboard.css";
import { useContext } from "react";
import { SeriesContext } from "../../context/SeriesContext";
import MoviePoster from "../../components/MoviePoster/MoviePoster";

const Dashboard = () => {
  const seriesContext = useContext(SeriesContext);
  const { schedule, viewShow } = seriesContext;

  return (
    <section className="dashboard">
      {schedule
        ? schedule.map(
            (item, i) =>
              i < 15 && (
                <MoviePoster
                  url={item.show.image ? item.show.image.medium : null}
                  alt={item.show.name}
                  viewShow={() => viewShow(item.show.id)}
                  isEpisode={false}
                  key={item.id}
                />
              )
          )
        : null}
    </section>
  );
};

export default Dashboard;

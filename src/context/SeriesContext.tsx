import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SeriesContext = createContext({});

interface ISchedule {
  id: number;
  image: IImage | null;
  summary: string;
  show: IShow;
}

interface IEmbedded {
  show: IShow;
  cast: Array<ICast>;
}

interface IShow {
  id: number;
  name: string;
  image: IImage;
  summary: string;
}

interface IImage {
  medium: string;
  original: string;
}

interface IShowInfo {
  id: number;
  name: string;
  genres: Array<string>;
  status: string;
  premiered: string;
  ended: string;
  image: IImage;
  summary: string;
  _embedded: IEmbedded;
}

interface ICast {
  person: IPerson;
}

interface IPerson {
  id: number;
  name: string;
  image: IImage;
}

interface IEpisodes {
  id: number;
  season: number;
  number: number;
  image: IImage;
}

const SeriesProvider = (props: any): void => {
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<ISchedule[]>([]);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [showInfo, setShowInfo] = useState<IShowInfo>();
  const [episodes, setEpisodes] = useState<IEpisodes[]>([]);
  const [seasons, setSeasons] = useState([]);

  const getSeasonsNumber = (): any => {
    const allSeasons: Array<number> | null = episodes.length
      ? episodes.map((ep, i) => ep.season).sort((a, b) => a - b)
      : [];
    setSeasons(allSeasons.length ? [...new Set(allSeasons)] : []);
  };

  const viewShow = (id: number) => {
    getShowInfo(id);
    getEpisodes(id);
    navigate("/series/" + id);
  };

  const today = new Date().toISOString().split("T")[0];

  const getSchedule = () => {
    fetch(`https://api.tvmaze.com/schedule?country=GB&date=${today}`)
      .then((response) => response.json().then((data) => setSchedule(data)))
      .catch((error) => console.log(error));
  };

  const getShowInfo = (id: number) => {
    fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then((response) => response.json().then((data) => setShowInfo(data)))
      .catch((error) => console.log(error));
  };

  const getEpisodes = (id: number) => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((response) => response.json().then((data) => setEpisodes(data)))
      .catch((error) => console.log(error));
  };

  const search = (e: any) => {
    e.preventDefault();

    fetch("https://api.tvmaze.com/search/shows?q=" + searchKey)
      .then((response) =>
        response
          .json()
          .then((data) => setSearchResults(data))
          .then(() => navigate("/search-results"))
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <SeriesContext.Provider
      value={{
        schedule,
        search,
        setSearchKey,
        searchKey,
        searchResults,
        showInfo,
        episodes,
        viewShow,
        seasons,
      }}
    >
      {props.children}
    </SeriesContext.Provider>
  );
};

export default SeriesProvider;

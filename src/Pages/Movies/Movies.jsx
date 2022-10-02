import axios from "axios";
import React, { useEffect, useState } from "react";
import Genres from "../../Components/Genres";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
import useGenre from "../../Hooks/useGenre";
import styles from "../Trending/Trending.module.css";

const Movies = () => {
  let [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const fetchData = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      setData([...data.results]);
      setNumOfPages(data.total_pages);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, [page, selectedGenres]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className={styles.trending}>
        {data &&
          data.map((element) => {
            return (
              <SingleContent
                key={element.id}
                id={element.id}
                poster={element.poster_path}
                title={element.title || element.name}
                date={element.first_air_date || element.release_date}
                media_type={"Movie"}
                vote_average={element.vote_average}
              />
            );
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination
          setPage={setPage}
          page={page}
          numOfPages={numOfPages}
        />
      )}
    </div>
  );
};

export default Movies;

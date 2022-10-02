import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
import styles from "./Trending.module.css";

const Trending = () => {
  let [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchData = async () => {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      setData([...data.results]);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
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
                media_type={element.media_type}
                vote_average={element.vote_average}
              />
            );
          })}
      </div>

      <CustomPagination setPage={setPage} page={page} />
    </div>
  );
};

export default Trending;

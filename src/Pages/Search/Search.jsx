import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
import styles from "../Trending/Trending.module.css";
const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  useLayoutEffect(() => {
    window.scroll(0,0)
  },[])

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setData([...data.results]);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{
            flex: 1,
          }}
          className="searchBox"
          label="Search..."
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ marginLeft: 10 }}
          onClick={() => {
            fetchSearch();
          }}
        >
          <SearchIcon />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
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
                media_type={type ? "tv" : "movie"}
                vote_average={element.vote_average}
              />
            );
          })}
      </div>
      {searchText &&
        !data &&
        (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
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

export default Search;

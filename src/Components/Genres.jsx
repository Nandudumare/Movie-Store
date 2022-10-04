import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  bounce,
  flip,
  rollIn,
  rubberBand,
  wobble,
  zoomIn,
  zoomInDown,
  zoomInUp,
  zoomOut,
  zoomOutUp,
} from "react-animations";
import { StyleSheet, css } from "aphrodite";

const styless = StyleSheet.create({
  zoomOut: {
    animationName: zoomOut,
    animationDuration: "1s",
  },
  zoomIn: {
    animationName: zoomIn,
    animationDuration: "1s",
  },
});
const Genres = ({
  type,
  setPage,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
}) => {
  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setGenres([...data.genres]);
    } catch (err) {}
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres([...genres.filter((gen) => gen.id !== genre.id)]);
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres([...selectedGenres.filter((gen) => gen.id !== genre.id)]);
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((el, index) => {
          return (
            <Chip
              label={el.name}
              color="success"
              variant="outlined"
              style={{ margin: 2 }}
              clickable
              key={el.id}
              onDelete={() => handleRemove(el)}
            />
          );
        })}
      {genres &&
        genres.map((el, index) => {
          return (
            <Chip
              label={el.name}
              color="primary"
              variant="outlined"
              style={{ margin: 2 }}
              clickable
              key={el.id}
              onClick={() => {
                handleAdd(el);
              }}
            />
          );
        })}
    </div>
  );
};

export default Genres;

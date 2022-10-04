import { Badge } from "@mui/material";
import React from "react";
// import { AnimationOnScroll } from "react-animation-on-scroll";

import { img_300, unavailable } from "../../config/config.js";
import ContentModal from "../ContentModal/ContentModal.jsx";
import styles from "./SingleContent.module.css";

import {
  bounce,
  flip,
  rollIn,
  rubberBand,
  wobble,
  zoomIn,
  zoomInDown,
  zoomInUp,
} from "react-animations";
import { StyleSheet, css } from "aphrodite";

const styless = StyleSheet.create({
  bounce: {
    animationName: zoomIn,
    animationDuration: "1s",
  },
});
const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <div className={css(styless.bounce)}>
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className={styles.poster}
          src={poster ? `${img_300}/${poster}` : `${unavailable}`}
          alt={title}
        />
        <b className={styles.title}> {title}</b>
        <span className={styles.subTitle}>
          {media_type === "tv" ? "TV Series" : "Movie"}

          <span className={styles.subTitle}>{date}</span>
        </span>
      </ContentModal>
    </div>
    // </AnimationOnScroll>
  );
};

export default SingleContent;

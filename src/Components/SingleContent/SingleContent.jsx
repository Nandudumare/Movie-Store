import { Badge } from "@mui/material";
import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

import { img_300, unavailable } from "../../config/config.js";
import styles from "./SingleContent.module.css";
const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    // <AnimationOnScroll animateIn="animate__fadeInRightBig">
    <div className={styles.media}>
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
    </div>
    // </AnimationOnScroll>
  );
};

export default SingleContent;

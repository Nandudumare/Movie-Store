import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../SingleContent/SingleContent.module.css";

import SS from "./ContentModal.module.css";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";

const style = {
  width: "90%",
  height: "80%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // backgroundColor: "rgba( 164, 255, 228, 0.35 )",
  backgroundImage:
    "radial-gradient( circle farthest-corner at 10% 20%,  rgba(37,145,251,0.98) 0.1%, rgba(0,7,128,1) 99.8% )",
  border: "1px solid #282c34",
  borderRadius: 10,
  backdropFilter: "blur( 7px )",
  color: "white",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  p: 4,
  // zIndex: 1000,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [video, setVideo] = React.useState();
  const [data, setData] = React.useState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      console.log("data:", data);

      setData(data);
    } catch (err) {}
    // console.log(data);
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      console.log("video:", data);

      setVideo(data.results[0]?.key);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.media} onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {data && (
            <div style={style}>
              <div className={SS.ContentModal}>
                <img
                  src={
                    data.poster_path
                      ? `${img_500}/${data.poster_path}`
                      : unavailable
                  }
                  alt={data.name || data.title}
                  className={SS.ContentModal__portrait}
                />

                <img
                  src={
                    data.backdrop_path
                      ? `${img_500}/${data.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={data.name || data.title}
                  className={SS.ContentModal__landscape}
                />
                <div className={SS.ContentModal__about}>
                  <span className={SS.ContentModal__title}>
                    {data.name || data.title} (
                    {(
                      data.first_air_date ||
                      data.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {data.tagline && <i className={SS.tagline}>{data.tagline}</i>}

                  <span className={SS.ContentModal__description}>
                    {data.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}

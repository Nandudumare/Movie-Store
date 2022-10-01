import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function MainNav() {
  const [value, setValue] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(`/${value}`);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: 500 }}
      value={value}
      onChange={handleChange}
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "rgba( 255, 255, 255, 0.1 )",
        backdropFilter: "blur(4.5px)",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        zIndex: 100,
      }}
    >
      <BottomNavigationAction
        label="Trending"
        value=""
        icon={<WhatshotIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Movies"
        value="movies"
        icon={<MovieIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="TV Series"
        value="series"
        icon={<TvIcon />}
        style={{ color: "white" }}
      />
      <BottomNavigationAction
        label="Search"
        value="Search"
        icon={<SearchIcon />}
        style={{ color: "white" }}
      />
    </BottomNavigation>
  );
}

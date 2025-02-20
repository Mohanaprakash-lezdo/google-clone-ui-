import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import SearchIcon from '@mui/icons-material/Search';
import "./Header.css";


const Header = ({setSearchQuery}) => {
    return (
      <header className="header">
          <div className="header-content">
          <h1>
            <LightbulbIcon className="icon" />
            Keep
          </h1>
          <input type='search' 
          placeholder="Search..."
          
          onChange={(e)=>setSearchQuery(e.target.value)}
           />
          </div>
      </header>
    );
  };
export default Header;

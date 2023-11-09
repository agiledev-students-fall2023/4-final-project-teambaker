import React, { useState, useEffect } from "react";
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import Logo from '../../components/common/Logo'
import ArtItem from "../../components/art/ArtItem.jsx"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom";
// import axiosProvider from "../../util/api/axios"

const FavoriteList = () => {
  // const [favorites, setFavorites] = useState([]);
  const [arts, setArts] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:3000/getfavlist`);
        setArts(response.data);
      } catch (error) {
        console.error("Error fetching favorite arts:", error);
       
        setArts([]);
      }
    }
  
    getData();
  }, []); 

  const updateFavorites = (artId, newFavoritedState) => {
    setArts(prevArts => prevArts.map(art => {
      if (art.id === artId) {
        return { ...art, inFavList: newFavoritedState };
      }
      return art;
    }));
  };

  const sortArts = (criteria) => {
    if (criteria === "name") {
      setArts(prevArts => [...prevArts].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (criteria === "year") {
      setArts(prevArts => [...prevArts].sort((a, b) => a.year - b.year));
    }
  }

  const handleArtItemClick = (artId) => {
    // Navigate to the art information page
    navigate("/info", { state: { from: location.pathname } });
  };
  return (
    <>
      <NavBar className="flex">
        <LeftBtn className="flex-grow" />
        <h2>My Favorite Arts</h2>
        <Logo />
      </NavBar>
      <div className="max-w-[30rem] w-[80%] mx-auto min-h-screen flex flex-col">
        <div className="text-center space-x-8 my-3">
          <button
            className="bg-white hover:bg-beige3 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded"
            onClick={() => sortArts("name")}>
            Sort by Name
          </button>
          <button
            className="bg-white hover:bg-beige3 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded"
            onClick={() => sortArts("year")}>
            Sort by Year
          </button>
        </div>


        <div className='mt-5'>
          {arts.map((art) => (
            <div key={art.id} onClick={() => handleArtItemClick(art.id)}>
              <ArtItem art={art} updateFavorites={updateFavorites} />
            </div>
          ))}
        </div>
      </div>
    </>


  )
};


export default FavoriteList;
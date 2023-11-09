import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import usePreventZoom from '../../util/hooks/usePreventZoom';
import ProfilePic from "../../components/account/profilePic";
import PopupSearch from "../../components/popup/popupSearch";
import TimelineBar from "../../components/timeline/TimelineBar";

const MapLayout = () => {
  usePreventZoom()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchPage, setSearchPage] = useState(false) // display search page or not
  const [searchData, setSearchData] = useState("") // content that user typed in bar
  // subject to changes
  // data necessary to search for art object (time & location)
  // {location:[lng, lat] (or city), time: num, search: bool}
  const [foundData, setFoundData] = useState({location:[], time:0, search:false})

  useEffect(() => {
    if (location.pathname === "/search") !searchPage && setSearchPage(true)
  }, [])


  // submit search result
  const handleSubmit = (evt) => {
    evt.stopPropagation()
    console.log(evt.target.value)
    // send data via react Context to SearchMap
    if (evt.target.value) {
      setSearchData(evt.target.value)
      if (location.pathname === "/") {
        navigate('/search')
        !searchPage && setSearchPage(true)
      }
    }
    else {
      navigate('/')
      searchPage && setSearchPage(false)
      setSearchData("")
    }
  }
  
  // navigate to profile page
  const handleClickProfile = (evt) => {
    evt.stopPropagation()
    navigate('/account', {state:{from: location.pathname}})
  }
  
  // navigate back to home page
  const handleClickBack = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    navigate('/')
    searchPage && setSearchPage(false)
    setFoundData(prev => ({
      ...prev, 
      search: false
    }))
  }
  // navigate to search page
  const handleClickSearch = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    navigate('/search')
    !searchPage && setSearchPage(true)
  }
  
  return (
    <>
    <div className="h-screen flex flex-col">
      <div className="h-[9rem]">
        <nav className="fixed py-[2vh] px-[10%] w-full bg-beige1 flex flex-col justify-between">
          <div className="relative w-full my-1">
            <input className={`w-full py-2 pl-10 pr-10 text-left
              border-solid border-2 border-navyBlue rounded-full
              placeholder:text-left placeholder:text-gray-400 bg-white`}
              onInput={handleSubmit}
              type="text" id="searchLocation" placeholder="Search for a city name"/>

              <div className="absolute left-1 top-1">
                {searchPage 
                  ? <img className="w-9 hover:cursor-pointer" onClick={handleClickBack} src="/leftbtn.png" alt="leftbtn"/>
                  : <img className="w-9 hover:cursor-pointer" onClick={handleClickSearch} src="/search.png" alt="search"/>}
              </div>

            <div className="h-9 w-9 absolute right-1 top-1" onClick={handleClickProfile}>
              <ProfilePic pic="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg/1200px-Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg"/>
            </div>
          </div>     
          
          <div className='mt-3'>
            <TimelineBar className='mt-3'/>
          </div>     

        </nav>
      </div>
      <div className="w-full h-full">
        <Outlet context={[searchData, foundData, setFoundData]}/>
      </div>
      {foundData.search && <PopupSearch setFoundData={setFoundData} foundData={foundData}/>}
    </div>

    </>
  );
};

export default MapLayout;
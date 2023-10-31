import ArtItem from "../art/ArtItem"
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const PopupSearch = (props) => {
  //
  const [arts, setArts] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    // Fetch mock data
    axios.get("https://my.api.mockaroo.com/fav_list?key=dd3f48f0", {
      headers: {
        "X-API-Key": "dd3f48f0"
      }
    })
      .then(response => {
        // Setting state based on potential response structures
        if (response.data.arts) {
          setArts(response.data.arts);
        } else {
          setArts(response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setArts([
          {id:"1", url:"https://picsum.photos/200", name:"error item1", year: "1234"},
          {id:"2", url:"https://picsum.photos/200", name:"error item2", year: "2345"}
        ])
      });
  }, []);

  const navigateToDetail = (evt) => {
    evt.preventDefault()
    navigate("/info", {state:{from:location.pathname}});  // Adjust this path as necessary
  }

  return(
    <>
      <div className="overflow-scroll absolute z-[2000] rounded-lg bottom-0 w-full h-[60vh] bg-beige1 p-[10%]">
        {/* <ArtItem /> */}
        <div className="mx-auto items-center">
          {arts.map(art => 
            <div onClick={navigateToDetail}>
              <ArtItem key={art.id} art={art}/>
            </div>)}
        </div>
      </div>
    </>
  )
}

export default PopupSearch
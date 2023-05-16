import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from './Componenets/Gallery'
import Searchbar from './Componenets/Searchbar'
import ArtistView from "./Componenets/ArtistView";
import AlbumView from "./Componenets/AlbumView";

function App() {
  const [search, setSearch] = useState('') 
  const [message, setMessage] =useState('Search for Music!')
  const [data, setData] = useState([])

  const API_URL = `https://itunes.apple.com/search?term=`

  useEffect(() => {
    if(search) {
   const fetchData = async () => {
    const URL = encodeURI(API_URL + search)
    const response = await fetch (URL) 
    const data = await response.json() 
    if (data.results.length > 0) {
    setData(data.results)
  } else {
    setMessage('Not Found')
    setData([])
  }
   } 

   fetchData() 
  }
}, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }
  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route path='/' elements={
            <>
            <Searchbar handleSearch ={handleSearch} />
            <Gallery data={data}/>
            </>
          } />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
      </Routes>
      </Router>
      </div>
  );
}

export default App;

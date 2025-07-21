import FacialExpressiona from "./components/facialExpressiona"
import './App.css'
import MoodSongs from "./components/MoodSongs"
import { useState } from "react";
function App() {
const [Songs, setSongs] = useState([
 
  ]);

  return (
    <>
      <div className="main">
        <FacialExpressiona setSongs={setSongs}/>
        <MoodSongs Songs={Songs}/>
      </div>
    </>
  )
}

export default App

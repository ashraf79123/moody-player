import { useRef, useState } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];

    if (isPlaying === index) {
      currentAudio.pause();
      setIsPlaying(null);
    } else {
      // Pause previously playing audio
      if (isPlaying !== null && audioRefs.current[isPlaying]) {
        audioRefs.current[isPlaying].pause();
      }
      currentAudio.play();
      setIsPlaying(index);
    }
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>
      

      {Songs.map((song, index) => (
        
        <div className="songs" key={index}>
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
        
          </div>
          <div className="play-pause-button">
            <button onClick={() => handlePlayPause(index)}>
              {isPlaying === index ? (
                <i className="ri-pause-line"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </button>
            <audio
              src={song.audio}
              ref={(el) => (audioRefs.current[index] = el)}
              onEnded={() => setIsPlaying(null)} // reset when song ends
              style={{ display: "none" }} // Hide default controls
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;

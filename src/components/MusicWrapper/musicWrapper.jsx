import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const MusicWrapper = ({ children, src }) => {
  const [audio, setAudio] = useState(null);
  const audioFromState = useSelector((state) => state.audio);

  useEffect(() => {
    if (audioFromState) {
      const audioElement = new Audio(src);
      audioElement.loop = true;
      audioElement.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
      setAudio(audioElement);


    } 
    
    else if (!audioFromState && audio){
      audio.pause();
      setAudio(null);
    }
  }, [audioFromState]);

  return <div>{children}</div>;
};

export default MusicWrapper;

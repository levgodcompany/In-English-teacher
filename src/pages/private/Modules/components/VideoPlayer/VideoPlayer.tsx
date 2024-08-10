import { useEffect, useState } from "react";
import style from "./VideoPlayer.module.css";
interface VideoPlayerProps {
  url: string;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {

  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Expresión regular para extraer el valor de src
    const srcMatch = url.match(/src="([^"]*)"/);
    if (srcMatch && srcMatch[1]) {
      setSrc(srcMatch[1]);
    }
  }, [url]);


  return (
    <div className={style.video_container}>

    {
      src ?       <iframe
      src={src}
      width="1366"
      height="728"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
      title="java"
    ></iframe> : <></>
    }

    </div>
  );
};

export default VideoPlayer;

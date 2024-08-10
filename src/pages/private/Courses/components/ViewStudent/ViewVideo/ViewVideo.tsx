import { useEffect, useState } from "react";
import style from "./ViewVideo.module.css";

interface ViewVideoProps {
  url: string;
  title: string;
  description: string;
}

const ViewVideo: React.FC<ViewVideoProps> = ({ url, title, description }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if(url.length > 0) {
      const srcMatch = url.match(/src="([^"]*)"/);
      if (srcMatch && srcMatch[1]) {
        setSrc(srcMatch[1]);
      }

    }else {
      setSrc(null);
    }
  }, [url]);

  return (
    <div className={style.container}>
      {src ? (
        <div className={style.video_container}>
          <div className={style.container_video}>
            <iframe
              src={src}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            ></iframe>
          </div>
          <div className={style.video_title}>
            <p className={style.title}>{title}</p>
          </div>
          <div className={style.video_info}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      ) : (
        <h1>No hay video</h1>
      )}
    </div>
  );
};

export default ViewVideo;

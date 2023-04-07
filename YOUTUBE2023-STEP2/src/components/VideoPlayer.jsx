import React from 'react';

const VideoPlayer = ({ video }) => {
  console.log(video);
  return (
    <div>
      <section>
        <iframe
          title="video play"
          type="text/html"
          width="100%"
          height="500px"
          src={`http://www.youtube.com/embed/${video.id.videoId}`}
          frameborder="0"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
};

export default VideoPlayer;

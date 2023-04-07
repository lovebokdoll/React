import React, { useEffect, useState } from 'react';

const ClonePage = () => {
  const [videos, setVideos] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(undefined);

  const selectedItem = (video) => {
    setSelectedVideo(video);
  };

  const handleKeyword = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };

  useEffect(() => {});

  return <></>;
};

export default ClonePage;

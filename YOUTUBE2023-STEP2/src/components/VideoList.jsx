import React from 'react';
import styled from 'styled-components';
import VideoItem from './VideoItem';

const VideoListDiv = styled.div`
  display: grid;
  margin-top: 10px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
`;

const VideoList = (props) => {
  const { videos, videoSelect } = props;
  console.log(videos);
  return (
    <>
      <VideoListDiv>
        {videos.map((video, index) => (
          <VideoItem key={index} video={video} videoSelect={videoSelect} />
        ))}
      </VideoListDiv>
    </>
  );
};

export default VideoList;

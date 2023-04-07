import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import VideoList from '../components/VideoList';
import VideoPlayer from '../components/VideoPlayer';

/**
 * 검색 기능 추가 - 사용자가 입력한 키워드관리
 * 1. 검색기 추가
 * 2. 비디오 선택 시 상세페이지
 * @returns
 */
const YoutubePage = () => {
  const [videos, setVideos] = useState([]);

  const [keyword, setKeyword] = useState('아이유');
  const [selectedVideo, setSelectedVideo] = useState(null);

  /**
   * 비디오가 선택되면 상태값을 관리
   */
  const [params, setParams] = useState({
    part: 'snippet',
    type: 'video',
    maxResults: 20,
    key: 'AIzaSyDE_7smZNSc-J4c7p44-gnbICMl5wKmI2g',
    q: `${'카리나'}`,
  });

  const videoSelect = (video) => {
    setSelectedVideo(video);
  };

  const changeKeyword = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };

  const youtubeSearch = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${keyword}&key=AIzaSyDE_7smZNSc-J4c7p44-gnbICMl5wKmI2g`
      )
      .then((result) => {
        console.log(result.data.items);
        setVideos(result.data.items);
        setSelectedVideo(result.data.items.id.videoId);
        console.log(selectedVideo);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container">
        <div>
          <h2>
            Youtube<small>유튜브</small>
          </h2>
          <hr />
        </div>
        <InputGroup className="mb-3">
          <Form.Control placeholder="검색" aria-label="검색어" aria-describedby="basic-addon2" onChange={changeKeyword} />
          <Button className="btn btn-danger" onClick={youtubeSearch}>
            Search
          </Button>
        </InputGroup>
        {selectedVideo && (
          <div>
            <VideoPlayer video={selectedVideo} />
          </div>
        )}
        <VideoList videos={videos} videoSelect={videoSelect} />
      </div>
    </>
  );
};

export default YoutubePage;

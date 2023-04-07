import React from 'react';
import styled from 'styled-components';

const VideoLi = styled.li`
  padding: 0.2em;
  list-style: none;
`;

const VideoCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  box-shadow: 3px 3px 5px 0px rgba(191, 191, 191, 0.55);
  cursor: pointer;
  transition: transform 250ms easy-in;
  %:hover {
    transform: scale(1.02);
  }
`;

const DIV = styled.div`
  margin-left: 0.3em;
`;

const Ptitle = styled.p`
  margin: 10;
  font-size: 0.8rem;
  color: violet;
`;

const Pchannel = styled.p`
  margin: 0;
  font-size: 0.3rem;
  color: blue;
`;

const VideoThumbnail = styled.img`
  width: 40%;
  height: 100%;
`;

const VideoItem = (props) => {
  // 첫 번째 파라미터는 비디오 한 건에 대한 정보, 두 번째 파라미터는 선택된 비디오의 이벤트 처리 함수의 주소번지를 받아서
  // VideoLi가 클릭되었을 때 파라미터로 video 한 건의 주소번지를 담아서 부모에서 정의된 이벤트 처리 함수를 호출한다.
  // VideoList에서 이벤트 처리를 마무리 하지 않고 props로 넘기는 이유가 무엇인가요?
  // VideoList에서는 n건을 가지고 있고 이 중에서 어떤 비디오 클립이 선택되었는지 알 수 없으니까
  // 이벤트 소스 클립은 리스트에 있지만 선택된 비디오 한 건에 대한 정보는 VideoItem에서 결정된다.
  // 그러니까 비디오 한 건에 대한 정확한 정보를 알고 있는 자손 컴포넌트인 VideoItem에서
  // 부모가 가진 함수의 주소번지를 props로 받고 이벤트 호출은 VideoItem에서 처리해야 한다.
  const { video, videoSelect } = props;
  return (
    <VideoLi onClick={()=>videoSelect(video)}>
      <VideoCard>
        <VideoThumbnail alt="video thumbnail" src={video.snippet.thumbnails.medium.url} />
        <DIV>
          {' '}
          <Ptitle key={video.id}>{video.snippet.title} </Ptitle>
          <Pchannel>{video.snippet.channelTitle}</Pchannel>
        </DIV>
      </VideoCard>
    </VideoLi>
  );
};

export default VideoItem;

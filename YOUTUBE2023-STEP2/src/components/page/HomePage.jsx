import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BlogHeader from '../include/BlogHeader';
import KakaoMap from '../kakao/KakaoMap';
import { ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';

const HomePage = ({ authLogic }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('로그인 요청');
    navigate('/login');
  };
  return (
    <>
      <ContainerDiv>
        <BlogHeader authLogic={authLogic} />
        <HeaderDiv>
          <h1 style={{ marginLeft: '10px' }}> 나가주세요🙏 고갱님 인스타 확인 부탁드립니다🙏</h1>
          <Button onClick={handleLogin}>로그인</Button>
        </HeaderDiv>
        <FormDiv>
          <div>이벤트존</div>
          <hr style={{ height: '2px' }} />
          <div>추천수업존</div>
          <hr style={{ height: '2px' }} />
          <KakaoMap />
          <div>카카오맵존</div>
          <hr style={{ height: '2px' }} />
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default HomePage;

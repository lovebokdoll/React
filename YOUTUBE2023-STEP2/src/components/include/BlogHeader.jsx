import React, { useEffect, useState } from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../service/authLogic';
const BlogHeader = ({ authLogic }) => {
  
  const navigate = useNavigate();
  const auth = authLogic.getUserAuth();
  const [email, setEmail] = useState();
/**
 * 리 렌더링 발생 경우 - 1) 상태 훅
 */
  useEffect(() => {
    setEmail(sessionStorage.getItem('email'));
  }, []); // 의존성 배열이란? ... 실행문(변수 선언, 제어문, 로직 - 기능)이 재요청되는 기준이다.
  const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <>
      <Navbar bg="primary">
        <Container fluid>
          <Link to="/" className="nav-link">
            *****
          </Link>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/dept/0" className="nav-link">
              Department
            </Link>
            <Link to="/board" className="nav-link">
              게시판
            </Link>
            <Link to="/replyboard" className="nav-link">
              댓글형게시판
            </Link>
            <Link to="/auth/signup" className="nav-link">
              Sign Up
            </Link>
            <Link to="/login" className="nav-link">
              로그인
            </Link>
          </Nav>
          <a href={KAKAO_AUTH_URL}>
            <Image src="/images/kakao/kakao_login_medium_wide.png" />
          </a>
          {email && (
            <Button
              variant="primary"
              onClick={() => {
                logout(auth);
                navigate('/login');
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default BlogHeader;

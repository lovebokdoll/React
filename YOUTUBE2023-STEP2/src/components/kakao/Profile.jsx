import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [user_id, setUserId] = useState();
  const [nickname, setNickname] = useState();
  const [profileImage, setProfileImage] = useState();

  const getProfile = async () => {
    try {
      let data = await window.Kakao.API.request({
        url: '/v2/user/me',
      });
      console.log(data.id);
      console.log(data.properties.nickname);
      console.log(data.properties.profile_image);

      setUserId(data.id);
      window.localStorage.setItem('userId', data.id);
      setNickname(data.properties.nickname);
      window.localStorage.setItem('nickname', data.properties.nickname);
      setProfileImage(data.properties.profile_image);
      navigate('/');
    } catch (error) {
      console.log('error = ', error);
    }
  };

  useEffect(() => {
    getProfile();
  });

  const kakaoLogout = async () => {
    //insert here 로그아웃 처리

    await axios({
      method: 'get',
      url: `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=http://localhost:3000`,
    })
      .then((res) => {
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('nickname');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3>{user_id}</h3>
      <h3>{nickname}</h3>
      <img src={profileImage} alt="프로필사진" />
      <br />
      <button onClick={kakaoLogout}>로그아웃</button>
    </>
  );
};

export default Profile;

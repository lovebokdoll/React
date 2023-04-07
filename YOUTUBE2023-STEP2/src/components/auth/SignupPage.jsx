import React from 'react';
import KhSignup from './KhSignup';
import Signuptype from './Signuptype';

const SignupPage = ({ authLogic }) => {
  const type = window.location.search.split('=')[1]; //member담김
  const type2 = window.location.search.split('&')[0].split('=')[1]; //member담김
  // console.log(window.location.search.split('&')); //['?type=member']
  // console.log(window.location.search.split('&')[0]); //?type=member
  // console.log(window.location.search.split('&')[0].split('=')); //['?type', 'member']
  // console.log(window.location.search.split('&')[0].split('=')[0]); //?type
  // console.log(window.location.search.split('&')[0].split('=')[1]); //member
  console.log('type ===> ', type);
  console.log('type2 ===> ', type2);

  const signuppage = () => {
    if (type) {
      return <KhSignup authLogic={authLogic} />;
    } else {
      return <Signuptype />;
    }
  };

  return signuppage();
};

export default SignupPage;

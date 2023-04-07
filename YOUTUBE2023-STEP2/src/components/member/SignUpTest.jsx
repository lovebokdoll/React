/* global daum*/
import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { memberInsertDB } from '../../service/dbLogic';
import BlogHeader from '../include/BlogHeader';
import './SignUpTest.css';

/**
 * 회원가입 페이지 컴포넌트
 * @returns
 */

const DivSignUp = styled.div`
  width: 300px;
  margin-left: 40%;
  margin-bottom: 7px;
`;

const SignUpTest = () => {
  // const { daum } = window;
  const navigate = useNavigate();

  const [mem_uid, setID] = useState('');
  const [mem_pw, setPW] = useState('');
  const [mem_name, setName] = useState('');
  const [mem_nickname, setNickname] = useState('');
  const [mem_email, setEmail] = useState('');
  const [mem_tel, setTel] = useState('');
  const [mem_birthday, setBirthday] = useState('');
  const [mem_gender, setGender] = useState('');
  const [mem_zipcode, setZipcode] = useState('');
  const [mem_address, setAddress] = useState('');
  const [mem_address_detail, setAddress_datail] = useState('');
  const [post, setPost] = useState({
    zipdoce: '',
    address: '',
    addres_detail: '',
  });
  const signUpSubmit = async () => {
    console.log('signUpSubmit');
    const member = {
      mem_uid,
      mem_pw,
      mem_name,
      mem_nickname,
      mem_email,
      mem_tel,
      mem_gender,
      mem_birthday,
      mem_zipcode,
      mem_address,
      mem_address_detail,
    };
    console.log(member);
    const res = await memberInsertDB(member);

    if (!res.data) {
      console.log('회원가입 실패');
    } else {
      console.log('회원가입 성공');
      navigate('/');
    }
  };

  const searchAddress = (event) => {
    event.preventDefault();
    console.log('searchAddress');
    new daum.Postcode({
      oncomplete: function (data) {
        let address = '';
        if (data.userSelectedType === 'R') {
          address = data.roadAddress; //도로명
        } else {
          address = data.jibunAddress; //지번
        }
        console.log(data);
        console.log(address);
        setPost({ ...post, zipcode: data.zonecode, address: address });
        document.querySelector('#mem_zipcode').value = data.zonecode;
        document.querySelector('#mem_address').value = address;
        document.querySelector('#mem_address_detail').focus();
        setZipcode(document.querySelector('#mem_zipcode').value);
        setAddress(document.querySelector('#mem_address').value);
      },
    }).open();
  };

  const handleID = useCallback((event) => {
    setID(event);
  }, []);
  const handlePW = useCallback((event) => {
    setPW(event);
  }, []);
  const handleName = useCallback((event) => {
    setName(event);
  }, []);
  const handleNickname = useCallback((event) => {
    setNickname(event);
  }, []);
  const handleEmail = useCallback((event) => {
    setEmail(event);
  }, []);
  const handleTel = useCallback((event) => {
    setTel(event);
  }, []);
  const handleGender = useCallback((event) => {
    setGender(event);
  }, []);
  const handleBirthday = useCallback((event) => {
    setBirthday(event);
  }, []);
  const handleZipcode = useCallback((event) => {
    setZipcode(event);
  }, []);
  const handleAddress = useCallback((event) => {
    setAddress(event);
  }, []);
  const handleAddressDetail = useCallback((event) => {
    setAddress_datail(event);
  }, []);

  return (
    <>
      <BlogHeader></BlogHeader>
      <Form>
        <h3 class="signUph3">Sign Up</h3>
        <DivSignUp className="signUpDiv">
          <span>아이디</span>
          <input
            type="text"
            id="mem_uid"
            name="mem_uid"
            className="form-control"
            placeholder="Enter id"
            onChange={(event) => handleID(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>비밀번호</span>
          <input
            type="password"
            id="mem_pw"
            name="mem_pw"
            className="form-control"
            placeholder="Enter password"
            onChange={(event) => handlePW(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>비밀번호 확인</span>
          <input type="password" id="mem_pw2" name="mem_pw2" className="form-control" placeholder="비밀번호를 확인해주세요." />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>이름</span>
          <input
            type="text"
            id="mem_name"
            name="mem_name"
            className="form-control"
            placeholder="Enter name"
            onChange={(event) => handleName(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>닉네임</span>
          <input
            type="text"
            id="mem_nickname"
            name="mem_nickname"
            className="form-control"
            placeholder="Enter nickname"
            onChange={(event) => handleNickname(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>Email</span>
          <input
            type="text"
            id="mem_email"
            name="mem_email"
            className="form-control"
            placeholder="Enter email"
            onChange={(event) => handleEmail(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>전화번호</span>
          <input
            type="text"
            id="mem_tel"
            name="mem_tel"
            className="form-control"
            placeholder="Enter tel"
            onChange={(event) => handleTel(event.target.value)}
          />
        </DivSignUp>{' '}
        <DivSignUp className="signUpDiv">
          <span>성별</span>
          <input
            type="text"
            id="mem_gender"
            name="mem_gender"
            className="form-control"
            placeholder="Enter gender"
            onChange={(event) => handleGender(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>생년월일</span>
          <input
            type="text"
            id="mem_birthday"
            name="mem_birthday"
            className="form-control"
            placeholder="Enter birthday"
            onChange={(event) => handleBirthday(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>우편번호</span>
          <input
            type="text"
            id="mem_zipcode"
            name="mem_zipcode"
            className="form-control"
            placeholder="Enter zipcode"
            onChange={(event) => handleZipcode(event.target.value)}
          />
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>주소</span>
          <input
            type="text"
            id="mem_address"
            name="mem_address"
            className="form-control"
            placeholder="Enter address"
            onChange={(event) => handleAddress(event.target.value)}
          />
          <div style={{ height: '10px' }}></div>
          <Button onClick={searchAddress}>주소검색</Button>
        </DivSignUp>
        <DivSignUp className="signUpDiv">
          <span>상세주소</span>
          <input
            type="text"
            id="mem_address_detail"
            name="mem_address_detail"
            className="form-control"
            placeholder="Enter 상세주소"
            readOnly={post.address ? false : true}
            onChange={(event) => handleAddressDetail(event.target.value)}
          />
        </DivSignUp>
        <div style={{ height: '20px' }}></div>
        <DivSignUp className="d-grid">
          <Button className="btn btn-primary" onClick={signUpSubmit}>
            Sign Up
          </Button>
        </DivSignUp>
        <DivSignUp className="forgot-password text-right">
          Already registered <Button>sign in?</Button>
        </DivSignUp>
      </Form>
    </>
  );
};

export default SignUpTest;

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deptDeleteDB, deptListDB, deptUpdateDB } from '../../service/dbLogic';
import { validateDname } from '../../service/validateLogic';
import '../css/style.css';
import BlogFooter from '../include/BlogFooter';
import BlogHeader from '../include/BlogHeader';
import { MyInput, MyLabel, MyLabelAb } from '../styles/FormStyle';

const DivDeptBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;

const DivUploadImage = styled.div`
  display: flex;
  width: 500px;
  height: 400px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeptDetail = ({ imageUploader }) => {
  const navigate = useNavigate();

  /**
   * 부서번호를 클릭했을 때 해시값으로 전달 된 부서번호 담기
   * 사용자가 부서번호를 선택할 때마다 변경됨으로 useEffect 의존 배열 인자로 활용함
   * App.jsx의 Route path hash value로 넘어온다. - 바뀐다.
   */
  const { deptno } = useParams('deptno');

  const [dept, setDept] = useState({
    DEPTNO: 0,
    DNAME: '',
    LOC: '',
    FILE_NAME: '',
    FILE_URL: '',
  });

  const [dname, setDname] = useState('');
  const [loc, setLoc] = useState('');
  const [files, setFiles] = useState({ file_name: null, file_url: null });

  // 수정화면 modal mount 여부를 결정 - false -> closed , true - open
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDname = useCallback((value) => {
    console.log(value);
    setDname(value);
  }, []);

  /**
   * useCallback이 없으면 DeptDetail이 mount 될 때마다 주소번지가 바뀐다.
   * 함수의 구현 내용이 변화가 없는 경우라면 한 번 생성된 주소번지를 계속 가지고 있어도 되지 않을까?
   * 그러면 이걸 기억해줘 - cache - 필요할 때 새로 생성하지 말고 cache에 있는 함수를 불러줘
   * 이렇게 처리하고 싶을 때 useCallback을 사용한다.
   */
  const handleLoc = useCallback((value) => {
    console.log(value);
    setLoc(value);
  }, []);

  /** SELECT */
  const deptList = () => {
    navigate('/dept/0');
  };

  /** INSERT */
  const deptUpdate = async () => {
    const dept = {
      deptno,
      dname,
      loc,
      file_name: files.file_name,
      file_url: files.file_url,
    };

    const res = await deptUpdateDB(dept);

    if (!res.data) {
      console.log('부서 수정 실패');
    } else {
      console.log('부서정보 수정 성공');
      // 성공 시 부서목록 새로고침 처리할 것 - window.location.reload()쓰지 말 것 - SPA 컨벤션
      handleClose();
      //navigate('/deptdetail/' + deptno);
      navigate('/dept/0');
    }
  };

  /**
   * DELETE
   */
  const deptDelete = () => {
    const asyncDB = async () => {
      const res = await deptDeleteDB({ deptno: deptno });
      console.log(res.data);
      navigate('/dept/0');
    };
    asyncDB();
  };

  /**
   * deptno가 변경될 때마다 함수가 실행된다.
   */
  useEffect(() => {
    const asyncDB = async () => {
      const res = await deptListDB({ deptno: deptno });
      console.log(res.data);
      const result = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(result);
      //console.log(jsonDoc[0]);
      setDept({
        DEPTNO: jsonDoc[0].DEPTNO,
        DNAME: jsonDoc[0].DNAME,
        LOC: jsonDoc[0].LOC,
        FILE_NAME: jsonDoc[0].FILE_NAME,
        FILE_URL: jsonDoc[0].FILE_URL,
      });
    };
    asyncDB();
  }, [deptno]);

  if (!dept.FILE_URL) {
    dept.FILE_URL = 'http://via.placeholder.com/200X250';
  }

  const imgChange = async (event) => {
    const uploaded = await imageUploader.upload(event.target.files[0]);
    console.log(uploaded);
    setFiles({
      file_name: uploaded.public_id + '.' + uploaded.format,
      file_url: uploaded.url,
    });
    // input 이미지 객체 얻어오기
    const upload = document.querySelector('#dummyimg');
    const holder = document.querySelector('#uploadImg');
    const file = upload.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      if (img.width > 150) {
        img.width = 150;
      }
      holder.innerHTML = '';
      holder.appendChild(img);
    };
    reader.readAsDataURL(file);
    return false;
  };

  /* 유효성 체크 START */
  const [comment, setComment] = useState({
    deptno: '',
    dname: '',
    loc: '',
  });
  const [star, setStar] = useState({
    deptno: '*',
    dname: '*',
    loc: '*',
  });
  const validate = (key, event) => {
    console.log('validate :' + key);
    let result;

    if (key === 'dname') {
      result = validateDname(event);
    }
    setComment({ ...comment, [key]: result });
    if (result) {
      if (result === '') {
        setStar({ ...star, [key]: '' });
      } else {
        setStar({ ...star, [key]: '*' });
      }
    } else {
      setStar({ ...star, [key]: '' });
    }
  };
  /* 유효성 체크 END */
  /**
   * RETURN
   */
  return (
    <>
      <BlogHeader />
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>상세보기</small>
          </h2>
          <hr />
        </div>
        <Card style={{ width: '58rem' }}>
          <Card.Body>
            <Card.Img style={{ width: '250px' }} src={`${dept.FILE_URL}`} alt="Card image" />
            <div style={{ height: '10px' }}></div>
            <DivDeptBody>
              {' '}
              <Card.Title>{dept.DEPTNO}</Card.Title>
              <Card.Text>{dept.DNAME}</Card.Text>
              <Card.Text>{dept.LOC}</Card.Text>
            </DivDeptBody>
          </Card.Body>
          <div>
            <Button onClick={handleShow}>수정</Button>
            &nbsp;
            <Button onClick={deptDelete}>삭제</Button>
            &nbsp;
            <Button onClick={deptList}>부서목록</Button>
            &nbsp;
          </div>
        </Card>
      </div>

      {/* ========================== [[ 부서정보 수정화면 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex' }}>
              <MyLabel>
                부서번호<span style={{ color: 'violet' }}>{star.deptno}</span>
                <MyInput type="text" id="deptno" placeholder="Enter 부서번호" value={deptno} />
                <MyLabelAb>{comment.deptno}</MyLabelAb>
              </MyLabel>
            </div>
            <div style={{ display: 'flex' }}>
              <MyLabel>
                부서명<span style={{ color: 'violet' }}>{star.dname}</span>
                <MyInput
                  type="text"
                  id="dname"
                  name="dname"
                  placeholder="Enter 부서명"
                  onChange={(event) => {
                    handleDname(event.target.value);
                    validate('dname', event);
                  }}
                />
                <MyLabelAb>{comment.dname}</MyLabelAb>
              </MyLabel>
            </div>

            <div style={{ display: 'flex' }}>
              <MyLabel>
                지역<span style={{ color: 'violet' }}>{star.loc}</span>
                <MyInput
                  type="text"
                  id="loc"
                  name="loc"
                  placeholder="Enter 지역"
                  onChange={(event) => {
                    handleLoc(event.target.value);
                  }}
                />
                <MyLabelAb>{comment.loc}</MyLabelAb>
              </MyLabel>
            </div>
            <Form.Group className="mb-3" controlId="formBasicOffice">
              <Form.Label>건물이미지</Form.Label>
              <input className="form-control" type="file" accept="image/*" id="dummyimg" name="dummyimg" onChange={imgChange} />
            </Form.Group>
            <DivUploadImage id="uploadImg">
              <Img src="http://via.placeholder.com/200X250" alt="미리보기" />
            </DivUploadImage>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={deptUpdate}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ========================== [[ 부서정보 수정화면 Modal ]] ========================== */}

      <BlogFooter />
    </>
  );
};
export default DeptDetail;

import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deptInsertDB, deptListDB } from '../../service/dbLogic';
import { validateDname } from '../../service/validateLogic';
import '../css/style.css';
import DeptRow from '../dept/DeptRow';
import BlogHeader from '../include/BlogHeader';
import BlogFooter from '../include/BlogFooter';
import { MyInput, MyLabel, MyLabelAb } from '../styles/FormStyle';
import styled from 'styled-components';

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

const DeptPage = ({ imageUploader }) => {
  // 화면 전환 시 가급적 전체 페이지 리로딩을 하지 않는다.
  // Navigate 훅을 사용하면 된다.
  const navigate = useNavigate();
  //Route path ="/dept/:category"
  //디폴트는 없고 부서 등록이 성공하면 1을 돌려줌
  const category = useParams();

  const [deptList, setDeptList] = useState([]);
  const [deptno, setDeptno] = useState(0);
  const [dname, setDname] = useState('');
  const [loc, setLoc] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //file_name 하나, file_url둘이니 객체로 선언할 것
  const [files, setFiles] = useState({ file_name: null, file_url: null });

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

  const handleDeptno = useCallback((value) => {
    console.log(value);
    setDeptno(value);
  }, []);

  const handleDname = useCallback((value) => {
    console.log(value);
    setDname(value);
  }, []);

  const handleLoc = useCallback((value) => {
    console.log(value);
    setLoc(value);
  }, []);

  //조건 검색 구현
  const reactSearch = () => {
    const category = document.querySelector('#category').value;
    const keyword = document.querySelector('#keyword').value;
    console.log('category ===>', category, ', keyword ===>', keyword);

    const asyncDB = async () => {
      const res = await deptListDB({ category, keyword, deptno: 0 });
      console.log(res.data);
      if (res.data) {
        setDeptList(res.data);
      } else {
        console.log('부서 목록 조회 실패');
      }
    };
    asyncDB();
  };
  //부서목록 가져오기

  //부서목록 JSON포맷 가져오기
  const jsonDeptList = async () => {
    const res = await deptListDB({ deptno: 0 });
    console.log(res.data);
    if (res.data) {
      setDeptList(res.data);
    } else {
      console.log('부서 목록 조회 실패');
    }
  };

  //이미지 파일첨부
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

  //부서등록구현
  /**
   * 스프링부트와 리액트 연동하기 - @RequestBody를 사용해서 JSON포맷으로 넘기는 컨셉
   */
  const deptInsert = async () => {
    const dept = {
      deptno,
      dname,
      loc,
      file_name: files.file_name,
      file_url: files.file_url,
    };

    const res = await deptInsertDB(dept);

    if (!res.data) {
      console.log('부서 등록 실패');
    } else {
      console.log('부서 등록 성공');
      // 성공 시 부서목록 새로고침 처리할 것 - window.location.reload()쓰지 말 것 - SPA 컨벤션
      handleClose();
      navigate('/dept/1');
    }
  };

  /**
   * 의존성 배열이 빈 배열이면 최초 한 번만
   * 의존성 배열에 올 수 있는 변수는 전역변수만 가능하다.
   */
  useEffect(() => {
    jsonDeptList();
  }, [category]);

  return (
    <>
      <BlogHeader />
      <div className="container">
        <div className="page-header">
          <h2>
            부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;
            <small>부서목록</small>
          </h2>
          <hr />
        </div>
        <div className="row">
          <div className="col-3">
            <select id="category" className="form-select" aria-label="분류선택">
              <option defaultValue>분류선택</option>
              <option value="deptno">부서번호</option>
              <option value="dname">부서명</option>
              <option value="loc">지역</option>
            </select>
          </div>
          <div className="col-6">
            <input
              type="text"
              id="keyword"
              className="form-control"
              placeholder="검색어를 입력하세요"
              aria-label="검색어를 입력하세요"
              aria-describedby="btn_search"
            />
          </div>
          <div className="col-3">
            <Button variant="danger" id="btn_search" onClick={reactSearch}>
              검색
            </Button>
          </div>
        </div>
        <div className="book-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>부서번호</th>
                <th>부서명</th>
                <th>지역</th>
              </tr>
            </thead>
            <tbody>
              {deptList.map((dept) => (
                <DeptRow key={dept.DEPTNO} dept={dept} />
              ))}
            </tbody>
          </Table>
          <hr />
          <div className="booklist-footer">
            <Button variant="warning" onClick={jsonDeptList}>
              전체조회
            </Button>
            &nbsp;
            <Button variant="success" onClick={handleShow}>
              부서등록
            </Button>
          </div>
        </div>
      </div>
      {/* ========================== [[ 도서등록 Modal ]] ========================== */}

      {/* ========================== [[ 부서등록 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex' }}>
              <MyLabel>
                부서번호<span style={{ color: 'violet' }}>{star.deptno}</span>
                <MyInput
                  type="text"
                  id="deptno"
                  name="deptno"
                  placeholder="Enter 부서번호"
                  onChange={(event) => {
                    handleDeptno(event.target.value);
                  }}
                />
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
          <Button variant="primary" onClick={deptInsert}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ========================== [[ 부서등록 Modal ]] ========================== */}
      <BlogFooter />
    </>
  );
};

export default DeptPage;

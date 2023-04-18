import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Datetime from "react-datetime";
import moment from "moment/moment";
import { off, onValue, ref, set } from "firebase/database";
import { database } from "../../service/firebase";
import MemoRow from "./MemoRow";
const MemoList = () => {
  const [show, setShow] = useState(false);
  const [m_no, setM_no] = useState(0);
  const [m_title, setM_title] = useState("");
  const [m_writer, setM_writer] = useState("");
  const [m_content, setM_content] = useState("");
  const [m_start, setM_start] = useState("");
  const [m_end, setM_end] = useState("");
  const [memo, setMemo] = useState({
    m_no: 0,
    m_title: "",
    m_writer: "",
    m_content: "",
    m_start: "",
    m_end: "",
  });
  const [memos, setMemos] = useState({});
  useEffect(() => {
    const startCountRef = ref(database, "memo");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setMemos(data);
      return () => off(startCountRef);
    });
  }, []);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const getMemoList = () => {};
  /**
   * 화면에 입력받은 정보
   */
  const handleChangeForm = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    //console.log('form 변경 발생 name: ', event.target.name);
    //console.log('form 변경 발생 valu: ', event.target.value);
    console.log("before ===> ", memo);
    setMemo({
      ...memo,
      m_no: Date.now(),
      [event.target.name]: event.target.value,
    });
    console.log("after ===> ", memo);
  };
  const handleStart = (date) => {
    console.log(date);
    const m_start = moment(date._d).format("YYYY-MM-DD HH:mm:ss");
    console.log(m_start);
    //setM_start(m_start);
    setMemo({
      ...memo,
      m_start: m_start,
    });
  };
  const handleEnd = (date) => {
    console.log(date);
    const m_end = moment(date._d).format("YYYY-MM-DD HH:mm:ss");
    console.log(m_end);
    //setM_end(m_end);
    setMemo({
      ...memo,
      m_end: m_end,
    });
  };
  // 일정 등록하기 구현
  const memoAdd = (event) => {
    event.preventDefault();
    console.log(memo);
    const pmemo = {
      m_no: memo.m_no,
      m_title: memo.m_title,
      m_writer: memo.m_writer,
      m_content: memo.m_content,
      m_start: memo.m_start,
      m_end: memo.m_end,
    };
    console.log("pmemo ===>", pmemo);
    set(ref(database, "memo/" + memo.m_no), pmemo);
    handleClose();
  };
  const memoSearch = () => {};
  return (
    <>
      {" "}
      <div className="container">
        <div className="page-header">
          <h2>
            일정관리 <small>일정목록</small>
          </h2>
          <hr />
        </div>
        <div className="row">
          <div className="col-3">
            <select id="gubun" className="form-select" aria-label="분류선택">
              <option defaultValue>분류선택</option>
              <option value="m_title">일정명</option>
              <option value="m_writer">작성자</option>
              <option value="m_content">내용</option>
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
            <Button variant="danger" id="btn_search" onClick={memoSearch}>
              검색
            </Button>
          </div>
        </div>
        <div className="book-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>일정명</th>
                <th>작성자</th>
                <th>일정시간</th>
              </tr>
            </thead>
            <tbody>
              {memos && // 데이터가 한 건도 없는 경우를 고려
                Object.keys(memos).map((key) => (
                  <MemoRow key={key} memo={memos[key]} />
                ))}
            </tbody>
          </Table>
          <hr />
          <div className="booklist-footer">
            <Button variant="warning" onClick={getMemoList}>
              전체조회
            </Button>
            &nbsp;
            <Button variant="success" onClick={handleShow}>
              글쓰기
            </Button>
          </div>
        </div>
      </div>
      {/* ========================== [[  일정등록 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>새로운 일정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="f_memo">
            <Form.Group className="mb-3 row" controlId="mTitle">
              <Form.Label className="col-sm-2 col-form-label">
                일정명
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  className="form-control form-control-sm"
                  type="text"
                  name="m_title"
                  onChange={handleChangeForm}
                  placeholder="Enter 일정명"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="boardWriter">
              <Form.Label className="col-sm-2 col-form-label">
                등록자
              </Form.Label>
              <div className="col-sm-10">
                <Form.Control
                  type="text"
                  name="m_writer"
                  onChange={handleChangeForm}
                  className="form-control form-control-sm"
                  placeholder="Enter 작성자"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="edit-start">
              <Form.Label className="col-sm-2 col-form-label">시작</Form.Label>
              <div className="col-sm-10">
                <Datetime
                  dateFormat="YYYY-MM-DD"
                  name="m_start"
                  onChange={handleStart}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="edit-end">
              <Form.Label className="col-sm-2 col-form-label">끝</Form.Label>
              <div className="col-sm-10">
                <Datetime
                  dateFormat="YYYY-MM-DD"
                  name="m_end"
                  onChange={handleEnd}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 row" controlId="boardContent">
              <Form.Label className="col-sm-2 col-form-label">내용</Form.Label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  name="m_content"
                  onChange={handleChangeForm}
                  rows="3"
                ></textarea>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={memoAdd}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ========================== [[ 글등록 Modal ]] ========================== */}{" "}
    </>
  );
};

export default MemoList;

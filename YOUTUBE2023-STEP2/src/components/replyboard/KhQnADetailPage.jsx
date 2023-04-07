import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { qnaDetailDB } from '../../service/dbLogic';
import BlogFooter from '../include/BlogFooter';
import BlogHeader from '../include/BlogHeader';
import { ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';
import RepleBoardFileDetail from './RepleBoardFileDetail';
import RepleBoardHeader from './RepleBoardHeader';

const KhQnADetailPage = ({ authLogic }) => {
  const search = window.location.search;
  console.log(search);
  const page = search
    .split('&')
    .filter((item) => {
      return item.match('page');
    })[0]
    ?.split('=')[1];
  console.log(page);
  const bno = search
    .split('&')
    .filter((item) => {
      return item.match('bno');
    })[0]
    ?.split('=')[1];
  console.log(bno);
  const [detail, setDetail] = useState({});
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const boardDetail = async () => {
      const board = {
        QNA_BNO: bno,
      };
      //상세보기 페이지에서는 첨부파일이 있는 경우에 fileList 호출 해야 함
      //qnaListDB에서는 qna_bno를 결정지을 수가 없음
      const res = await qnaDetailDB(board);
      console.log(res.data);

      const temp = JSON.stringify(res.data);
      const jsonDoc = JSON.parse(temp);
      console.log(jsonDoc[0]);
      console.log(jsonDoc[1]);
      console.log(jsonDoc[2]);
      console.log(jsonDoc[3]);
      console.log(jsonDoc[0].QNA_TITLE);
      console.log(jsonDoc[0].QNA_CONTENT);
      console.log(jsonDoc[0].MEM_NAME);
      console.log(jsonDoc[0].MEM_NO);
      console.log(jsonDoc[0].QNA_DATE);
      console.log(jsonDoc[0].QNA_HIT);
      console.log(JSON.parse(jsonDoc[0].QNA_SECRET));
      if (JSON.parse(jsonDoc[0].QNA_SECRET)) {
        if (sessionStorage.getItem('auth') !== '3' && sessionStorage.getItem('number') !== JSON.stringify(jsonDoc[0].MEM_NO)) {
          //navigate(`/qna/list?page=1`);
          //return dispatch(setToastMsg("권한이 없습니다."));
        }
      }
      /**
       * 이미지 파일을 담을 배열 선언
       */
      const list = [];
      if (jsonDoc.length > 1) {
        for (let i = 1; i < jsonDoc.length; i++) {
          const obj = {
            FILE_NAME: jsonDoc[i].FILE_NAME,
          };
          list.push(obj);
        }
      }
      setFiles(list);

      setDetail({
        QNA_TITLE: jsonDoc[0].QNA_TITLE,
        QNA_CONTENT: jsonDoc[0].QNA_CONTENT,
        MEM_NAME: jsonDoc[0].MEM_NAME,
        MEM_NO: jsonDoc[0].MEM_NO,
        QNA_DATE: jsonDoc[0].QNA_DATE,
        QNA_HIT: jsonDoc[0].QNA_HIT,
        QNA_SECRET: JSON.parse(jsonDoc[0].QNA_SECRET),
        QNA_TYPE: jsonDoc[0].QNA_TYPE,
      });
    };
    boardDetail();
  }, [setDetail, setFiles, bno, dispatch, navigate]);
  console.log('detail ===>', detail);
  return (
    <>
      <BlogHeader authLogic={authLogic} />
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{ marginLeft: '10px' }}>QnA 게시글</h3>
        </HeaderDiv>
        <FormDiv>
          <RepleBoardHeader detail={detail} bno={bno} />
          <section style={{ minHeight: '400px' }}>
            <div dangerouslySetInnerHTML={{ __html: detail.QNA_CONTENT }}></div>
          </section>
          <RepleBoardFileDetail files={files} />
          <hr style={{ height: '2px' }} />
        </FormDiv>
      </ContainerDiv>

      <BlogFooter />
    </>
  );
};

export default KhQnADetailPage;

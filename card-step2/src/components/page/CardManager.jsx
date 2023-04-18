import { off, onValue, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { database } from "../../service/firebase";
import Footer from "../include/Footer";
import Header from "../include/Header";
import CardEditor from "./CardEditor";
import Preview from "./Preview";

const MakerDiv = styled.div`
  width: 100%;
  height: 100%;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const ContainerDiv = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const CardManager = ({ FileInput }) => {
  /* Realtime database */
  console.log(database);

  /**
   * userId 활용
   */
  const userId = window.localStorage.getItem("userId");
  console.log(userId);
  //페이지가 렌더링 될 때 한번 요청하기
  //조회 처리 전에 userID를 쥐고 있어야함 - 현재는 localstorage에 있음
  //그렇기 때문에 의존성배열에 userId를 넣으면 안됨
  //왜냐하면 userId가 변경될 때만 실행되니까
  useEffect(() => {
    //사용자별로 네임카드를 관리하기 위해서 트리에 root로 userID를 사용함
    //다시 card아래 생성된 시간을 10진수로 받아서 라벨 및 id값으로 사용함
    const starCountRef = ref(database, `${userId}/card`);
    console.log(starCountRef);
    onValue(starCountRef, (snapshot) => {
      //검색된 정보가 담김
      const data = snapshot.val();
      console.log(data);
      //검색된 정보를 실시간으로 화면과 동기화처리를 위해서 state훅에 초기화 함
      setCards(data);
      return () => off(starCountRef);
    });
  }, []);

  const { userAuth } = useSelector((store) => store);
  const [cards, setCards] = useState({});

  /**
   * 입력과 수정시에 모두 사용한다.
   * @param {*} card
   */
  const createOrUpdateCard = (card) => {
    console.log(userId);
    setCards((cards) => {
      const updated = { ...cards }; // id가 오브젝트에 없다면 새로운 것이 추가된다.
      updated[card.id] = card;
      return updated;
    });
    console.log(card.id);
    set(ref(database, `${userId}/card/${card.id}`), card);
  };

  //데이터셋은 CardManager에 있어요 - 원본은 건들지 않는다 - 복사본사용 -> 삭제 , 추가, 수정
  //삭제버튼은 CardEditorForm.jsx에 있어요 - 삭제 대상 card도 거기에 있겠죠
  //자바스크립트는 파라미터를 사용가능함
  //파라미터값은 언제 어디서 결정되나요? 사용자가 delete버튼을 선택되고 클릭하면 deleteCard함수 호출해야 함
  //그때 파라미터로 card를 전달 받을 수 있습니다.
  //해당변수는 함수이다.
  //삭제대상이 되는 정보를 가진 card파라미터는 CardEditorForm에서 올라온다. -> 이벤트 버블링과 같은 concept
  const deleteCard = (card) => {
    //삭제하고자 하는 card정보를 여기서 결정할 수 없어요 . 그럼 어디서 결정되나요
    console.log(card);
    setCards((cards) => {
      //리렌더링 즉시 -> return -> 내안에 컴포넌트 -> redering
      //스프링부트에서 넘어오는 데이터셋은 useState매핑 -> 화면이 다시 그려진다
      const updated = { ...cards }; //복사 spread - 깊은복사 -
      delete updated[card.id];
      return updated; // 복사본이 리턴된다
    });
    remove(ref(database, `${userId}/card/${card.id}`));
  };

  return (
    <MakerDiv>
      <Header />
      <ContainerDiv>
        <CardEditor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </ContainerDiv>
      <Footer />
    </MakerDiv>
  );
};

export default CardManager;

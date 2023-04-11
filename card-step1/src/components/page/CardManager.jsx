import React, { useState } from "react";
import Header from "../include/Header";
import styled from "styled-components";
import Footer from "../include/Footer";
import Preview from "./Preview";
import { useSelector } from "react-redux";
import CardEditor from "./CardEditor";

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
  //auth객체정보 수집위해 -> userAuth.auth
  const { userAuth } = useSelector((store) => store);
  const [cards, setCards] = useState({
    1: {
      id: "1",
      name: "명수",
      company: "Samsung",
      theme: "dark",
      title: "Software Engineer",
      email: "lee@gmail.com",
      message: "go for it",
      fileName: "lee",
      fileURL:
        "https://res.cloudinary.com/dgwqtaajy/image/upload/v1681195017/ersxxmbzyvbvljq4cu6s.jpg",
    },
    2: {
      id: "2",
      name: "명수옹",
      company: "Cupang",
      theme: "light",
      title: "Software Engineer",
      email: "kim@gmail.com",
      message: "I can do it",
      fileName: "kim",
      fileURL:
        "https://res.cloudinary.com/dgwqtaajy/image/upload/v1681195539/dmnbos757xahwztwn2ji.jpg",
    },
    3: {
      id: "3",
      name: "박퀴벌",
      company: "MBC",
      theme: "colorful",
      title: "Software Engineer",
      email: "you@gmail.com",
      message: "we are the world",
      fileName: "you",
      fileURL:
        "https://res.cloudinary.com/dgwqtaajy/image/upload/v1681195476/dr49u5wxs2znbtitb16k.jpg",
    },
  });
  //데이터셋은 CardManager에 있다. 원본은 건들지 않는다- 복사본 사용
  //삭제버튼은 CardEditorForm 에 있다 - 삭제대상도 거기에 있음
  //자바스트립트는 파라미터 사용가능
  //파라미터는 사용자가 delete를 선택할때 결정됨 -> 선택하면 deleteCard함수 호출해야함
  //그때 파라미터로 card전달 받을 수 있다.
  const deleteCard=card=>{ //삭제하고자하는 카드정보를 여기서 결정할 수 없다. -> 사용자가 눌렀을 때 결정됨 (cardEditorForm)
    console.log(card)
    setCards(cards=>{ //리렌더링 - 화면에 대한 반영이 일어남
      //스프링부트에서 넘어오는 데이터셋은 useState매핑-> 화면이 다시 그려지니까...
      const updated={...cards}//복사 spread연산자
      delete updated=[card.id]
      return updated //복사본이 return된다
    })
  }
  return (
    <MakerDiv>
      <Header />
      <ContainerDiv>
        <CardEditor FileInput={FileInput} cards={cards} />
        <Preview cards={cards} />
      </ContainerDiv>
      <Footer />
    </MakerDiv>
  );
};

export default CardManager;

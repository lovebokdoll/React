import React from "react";
import CardAddForm from "./CardAddForm";
import styled from "styled-components";
import CardEditorForm from "./CardEditorForm";

const EditorDiv = styled.div`
  flex-basis: 50%;
  border-right: 1px solid #9e7676; /* editor와 preview사이에 구분선 넣기 */
  padding: 0.5em 2em;
  overflow-y: auto;
`;
const TitleH1 = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
  color: #594545;
`;
const CardEditor = ({ FileInput, cards, addCard, updateCard, deleteCard }) => {
  console.log(cards); //3건 출력
  return (
    <EditorDiv>
      <TitleH1>Card Editor</TitleH1>
      {/* 네임카드 수정화면 추가 */}
      {Object.keys(cards).map((key) => (
        /*카드는 3개 로우에 대해서 한 개 csrd정보만 전달해야 한다.*/
        <CardEditorForm FileInput={FileInput} key={key} card={cards[key]} deleteCard={deleteCard}/>
      ))}
      <CardAddForm FileInput={FileInput} />
    </EditorDiv>
  );
};

export default CardEditor;

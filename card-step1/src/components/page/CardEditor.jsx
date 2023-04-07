import React from "react";
import CardEditorForm from "./CardEditorForm";
import CardAddForm from "./CardAddForm";
import styled from "styled-components";

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
  color: darkred;
`

const CardEditor = ({ cards }) => {
  return (
    <EditorDiv>
      <TitleH1>Card Editor</TitleH1>
      {Object.keys(cards).map((key) => (
        <CardEditorForm />
      ))}
      <CardAddForm />
    </EditorDiv>
  );
};

export default CardEditor;

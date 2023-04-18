import React from "react";
import styled from "styled-components";
import Card from "./Card";

const PreviewDiv = styled.div`
  flex-basis: 50%;
  overflow-y: auto;
`;
const TitleH1 = styled.div`
  width: 100%
  text-align: center;
  margin-bottom: 1em;
  font-weight: bold;
`;
const CardsUI = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0.5em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Preview = ({ cards }) => {
  return (
    <PreviewDiv>
      <TitleH1>CardPreview</TitleH1>
      <CardsUI>
        {Object.keys(cards).map((key) => (
          <Card key={key} card={cards[key]} />
        ))}
      </CardsUI>
    </PreviewDiv>
  );
};

export default Preview;
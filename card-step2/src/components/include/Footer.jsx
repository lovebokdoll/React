import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  width: 100%;
  background-color: #b9e9fc;
  text-align:center;
`;
const TitleP = styled.p`

`;
const Footer = () => {
  return (
    <FooterDiv>
      <TitleP>나는야 바다의 왕자</TitleP>
    </FooterDiv>
  );
};

export default Footer;

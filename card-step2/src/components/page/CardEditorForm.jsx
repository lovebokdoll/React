import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import ImageFileInput from "../common/ImageFileInput";

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap; /* 한 줄에 하나씩 떨어질 수 있도록 랩을 주고 */
  border-top: 1px solid black;
  border-left: 1px solid black;
  margin-bottom: 1em;
`;
const NameInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #f5ebe0; //#F5EBE0, #FEFCF3
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */
`;
const CompanyInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #f5ebe0;
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */
`;
const TitleInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #f5ebe0;
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */
`;
const EmailInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #f5ebe0;
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */
`;

const ThemeSelect = styled.select`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #f5ebe0;
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */
`;
const MessageTextArea = styled.textarea`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #f5ebe0;
`;
const FileInputDiv = styled.div`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #f5ebe0;
`;
const CardEditorForm = ({ FileInput, card, updateCard, deleteCard }) => {
  const { name, company, title, email, message, theme, fileName, fileURL } =
    card;
  /**
   * 이미지 파일을 선택하는것 만으로도 이벤트 감지가 발생하여 CardManager에 정의된 createOrUpdateCard가 호출됨
   * CardEditorForm에서는 updateCard함수가 호출되고 파라미터로 변경된 caard정보를
   * CardManager까지props로 넘겨 받은것을 역으로 호출되는 구조임
   * 이렇게 역으로 보내는 방법이 필요한 이유는 병견된 정보를 쥐고 있는것은 CardManager가 아니라 CardEditorForm이기 때문임
   */
  const onFileChange = (file) => {
    console.log(file);
    // useState에 초기화된 배열에 사용자가 선택한 fileName과 fileURL을 추가해서 배열을 수정해준다
    updateCard({
      ...card,
      fileName: file.name,
      fileURL: file.url,
    });
  }; //end of onFileChange

  const onChange = (event) => {
    if (event.currentTarget == null) {
      return;
    }
    //브라우저에서 기본적인 이벤트 처리를 하지 않도록 처리한다
    event.preventDefault();
    updateCard({
      ...card,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  //maker.jsx에서 deleteCard호출할때 실제 기능 처리할 코드임- 이걸 해야 삭제됨
  const onSubmit = (e) => {
    //이벤트버블링!!차단하는 코드가 반드시 와야한다. 이것을 하지 않으면 화면이 새로고침 된다. -> 무한반복 -> 치명적일수 있다.
    e.preventDefault();
    //여기서 호출되는 함수는 CardManager에서 왔다.
    //파라미터자리에 card를 사용할 수 있나?
    //삭제버튼은 여기에 있지만
    deleteCard(card);
  };
  return (
    <Form>
      <NameInput type="text" name="name" value={name} onChange={onChange} />
      <CompanyInput
        type="text"
        name="company"
        value={company}
        onChange={onChange}
      />
      <ThemeSelect name="theme" value={theme} onChange={onChange}>
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="colorful">colorful</option>
      </ThemeSelect>
      <TitleInput type="text" name="title" value={title} onChange={onChange} />
      <EmailInput type="text" name="email" value={email} onChange={onChange} />
      <MessageTextArea
        name="message"
        value={message}
        onChange={onChange}
      ></MessageTextArea>
      <FileInputDiv>
        <FileInput name={fileName} onFileChange={onFileChange} />
      </FileInputDiv>
      <Button name="Delete" onClick={onSubmit} />
    </Form>
  );
};

export default CardEditorForm;

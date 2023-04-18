import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../common/Button'

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap; /* 한 줄에 하나씩 떨어질 수 있도록 랩을 주고 */
  border-top: 1px solid black;
  border-left: 1px solid black;
  margin-bottom: 1em;    
`
const NameInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #F5EBE0;//#F5EBE0, #FEFCF3
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */   
`
const CompanyInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #F5EBE0; 
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */   
`
const TitleInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #F5EBE0; 
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */   
`
const EmailInput = styled.input`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #F5EBE0; 
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */   
`

const ThemeSelect = styled.select`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #F5EBE0; 
  flex: 1 1 30%; /* 30%주어서 한 줄에 3개씩 나오게 하고 */   
`
const MessageTextArea = styled.textarea`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #F5EBE0;     
`
const FileInputDiv = styled.div`
  font-size: 0.8rem;
  width: 100%;
  border: 0;
  padding: 0.5em;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background: #F5EBE0;    
`	 
const KhCardAddForm = () => {
  //값들을 읽어와서 Card에 추가하기
  const formRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [file, setFile] = useState({ fileName: null, fileURL: null});	
  const onFileChange = (file) => {
    console.log(file);
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  }	
  const onSubmit = (event) => {
		//이벤트 전이 막기 - button태그는 디폴트가 submit속성을 가짐. - 그래서 화면이 새로고침일어남 -이것을 막아줌
		event.preventDefault();
		//사용자가 입력한 값을 받아서 카드를 만듦 -> 이제 카드를 추가해주면 된다
		const card = {
			id: Date.now(),//uuid
			name: nameRef.current.value || '', /* 입력된 값이 있으면 쓰고 없으면 빈문자열 치환 */
			company: companyRef.current.value || '',
			theme: themeRef.current.value,
			title: titleRef.current.value || '',
			email: emailRef.current.value || '',
			message: messageRef.current.value || '',
			fileName: file.fileName || '', /* 나중에 제대로 해보자 null이라면 빈문자열*/
			fileURL: file.fileURL || '',  /* 나중에 제대로 해보자 */
		};
		formRef.current.reset();// 즉 사용자가 입력해서 제출하고 나면 폼이다 리셋되도록 이렇게 해줌
		setFile({ fileName: null, fileURL: null });
};	
  return (
		<Form ref={formRef}>
			<NameInput ref={nameRef} type="text" name="name" placeholder="Name"/>
			<CompanyInput ref={companyRef} type="text" name="company" placeholder="Company"/>
			<ThemeSelect ref={themeRef} name="theme" placeholder="Theme">
				<option placeholder="light">light</option>
        <option placeholder="dark">dark</option>
        <option placeholder="colorful">colorful</option>
			</ThemeSelect>
			<TitleInput ref={titleRef} type="text" name="title" placeholder="Title"/>
			<EmailInput ref={emailRef} type="text" name="email" placeholder="Email"/>
			<MessageTextArea ref={messageRef} name="message" placeholder="Message"/>
			<FileInputDiv>
        <FileInput name={file.fileName} onFileChange={onFileChange} />
      </FileInputDiv>
      <Button name="Add" onClick={onSubmit}/>
		</Form>
  )
}

export default KhCardAddForm
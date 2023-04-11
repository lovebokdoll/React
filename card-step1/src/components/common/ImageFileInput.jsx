import React, { useRef, useState } from "react";
import styled from "styled-components";
import styles from "./imageFileInput.css";
const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 아이템을 가운데 오게함 */
  align-items: center; /* 아이템을 중간 middle에 오게함 */
`;
const HiddenInput = styled.input`
  display: none;
`;
const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
  console.log(name);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    // No file이 클릭되었을 때 버튼 클릭하기
    inputRef.current.click();
  };
  // 파일이 변경될 때
  // 이제 이 파일을 우리 업로드 서비스에 전달하면 되겠죠 자 그래서 이제 imageUploader에
  // 있는 upload라는 함수를 이용해서 우리가 선택된 이 파일을 전달해 줄거고요
  // 처음 우리가 정의 할 때 async 였죠 그래서 promise가 리턴이 됩니다
  // 그래서 then하고 catch를 하고 하면 되고요 이렇게 그냥 promise를 이용해서 then then then
  // 하셔도 되고요 아니면 이 리스너 자체를 이 콜백 자체를 async라고 붙일 수가 있어요
  // 이렇게 해서 uploaded는 await 이것이 실행 될 때 까지 기다렸다가 완료가 되면 여기
  // uploaded는 await 이것이 실행될 때까지 기다렸다가 완료가 되면 여기 uploaded에
  // 할당이 되는 거죠 이제 완료가 되면 onFileChange라는 여기 prop으로 전달된
  // 이 콜백함수에 우리 파일이 바뀌었어 라고 알려 줘야 되죠
  const onChange = async (event) => {
    // 아래에서 로딩중 정보를 true로 변경해 주고 아래 34번에서 로딩이 끝나고 나면 다시 false로 변경해줌
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    console.log(uploaded);
    setLoading(false);
    onFileChange({
      //name: 'fileName',
      name: uploaded.original_filename,
      //url: 'url'
      url: uploaded.url,
    });
  };
  return (
    <ContainerDiv>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {/* 로딩중이 아니면 아래 코드가 처리 */}
      {!loading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || "No file"}
        </button>
      )}
      {/* 로딩 중이면 아래 코드 처리 */}
      {loading && <div className={styles.loading}></div>}
    </ContainerDiv>
  );
};
export default ImageFileInput;

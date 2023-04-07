import React, { useEffect, useState } from 'react';
import { memberListDB } from '../../service/dbLogic';

const MemberPage = ({ imageUploader }) => {
  const [member, setMember] = useState({});

  useEffect(() => {
    const memberList = async () => {
      const res = await memberListDB(member);
      console.log(res.data);
    };
    memberList();
  }, []);

  /**
   * async가 붙은 함수에서만 await을 사용할 수 있다. - 파일이 업로드 될 때까지 기다림
   *
   * @param {} event
   */
  const imgChange = async (event) => {
    console.log(event.target.files[0]);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    // public_id - 선택한 이미지의 실제 아이디가 아닌 cloudinary에서 부여하는 아이디 값
    // 이 값으로 실제 이미지 링크 정보가 생성된다. - format은 선택한 파일의 확장자이다. -
    console.log(`${uploaded.public_id}${uploaded.format}${uploaded.url}`);
  };

  return (
    <>
      <h3>회원관리 페이지입니다.</h3>
      <input type="file" name="mimg" id="mimg" onChange={imgChange} />
    </>
  );
};

export default MemberPage;

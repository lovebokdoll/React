/**
 * 액션
 */
export const increase = (mem_name) => ({
  type: "INCREASE",
  payload: mem_name,
});
/**
 * 초기상태 만들기
 */
const initstate = {
  number: 0,
  mem_name: "이순신",
  empVO: { empno: 7566, ename: "나신입" },
  depts: [
    { DEPTNO: 10, DNAME: "총무부", LOC: "인천" },
    { DEPTNO: 20, DNAME: "영업부", LOC: "서울" },
    { DEPTNO: 30, DNAME: "개발부", LOC: "제주" },
  ],
  auth: "",
  googleProvider: "",
};
/**
 * 처음 수업할 때 worker로 정했던 부분
 * worker->reducer함수로 전환
 * 액션의 결과를 필터링-리듀서
 */
const reducer = (state = initstate, action) => {
  switch (action.type) {
    case "INCREASE":
      //return이 언제 누구에게 무었을 어떤순간에 변경이 되는건가?
      //return이 되면 호출한쪽에서 받는게 아니라, return되는 순간 바로 화면이 변경된다.
      return { ...state, number: state.number + 1, mem_name: action.payload };
    default:
      return { ...state }; //깊은복사 : 새로운 객체가 생성되는것
  }
};

export default reducer;

import { Route, Routes } from 'react-router-dom';
import './App.css';
import ClonePage from './pages/ClonePage';
import YoutubePage from './pages/YoutubePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/youtube" exact={true} element={<YoutubePage />} />
        <Route path="/" exact={true} element={<ClonePage />} />
      </Routes>
    </>
  );
};

export default App;

/**
 * redux 설정 - index.js에서 처리한다.
   :Provider store 설정 - reducer 읽기 - dispatch - state초기화 - 변수들에 대한 목록, 초기값 확인
   : state 값은 언제 바뀌지? dispatch(setToastMessage('메시지')) false -> true
*/

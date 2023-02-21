const HackerNews = (props) => {
  const { newsList } = props; //구조분해할당

  return (
    <div>
      {/* [{},{}...] 형태의 map찾아서 공부 */}
      {newsList &&
        Object.keys(newsList).map((key) => (
          <li>
            {newsList[key].id}/ 
            ({newsList[key].title})/
             user:{newsList[key].user}/ 
             time_ago:{newsList[key].time}
          </li>
        ))}
    </div>
  );
};

export default HackerNews;

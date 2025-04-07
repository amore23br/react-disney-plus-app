import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "d9a8d880e79ba23ccab5c75d67075691",
    language: "ko-KR",
  },
});

export default instance;

//반복되는 코드를 인스턴스화함으로써 가독성과 재사용성 높이기

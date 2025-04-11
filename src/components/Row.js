import React, { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  // fetchUrl가 바뀔때 fetchMovieDate 재실행
  const fetchMovieDate = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  //useEffect 를 사용하여 데이터 가져오기
  useEffect(() => {
    fetchMovieDate();
  }, [fetchMovieDate]);

  // 영화 자세히 보기 클릭 모달
  const handleClick = (movie) => {
    setModalOpen(true);
    //영화정보 담아주기
    setMovieSelected(movie);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {" < "}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {" > "}
          </span>
        </div>
      </div>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Row;

/**
랜더링 될 때마다 함수도 재실행 -> 이걸 막기 위해 useCallback 함수 사용
useCallback : 컴포넌트가 렌더링 될 때마다 함수를 새로 생성하지 않고, 메모리에 저장된 함수를 재사용할 수 있도록 해주는 Hook
useCallback(()=> {}, []);
[] : dependency array, [] 안에 있는 값이 바뀔 때만 useCallback 안의 함수가 실행됨
 */

/**
 onClick={() => {
    document.getElementById(id).scrollLeft -= window.innerWidth - 80;
  }}
  
 */

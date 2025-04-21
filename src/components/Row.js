import React, { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

// import Swiper and modules styles
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//import "swiper/css/scrollBar";
import styled from "styled-components";

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
    <Container>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} //loop 사용유무(반복)
        navigation // arrow button 사용유무
        pagination={{ clickable: true }} // pagination btn 보이게할지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <Content id={id}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Wrap>
                <img
                  key={movie.id}
                  className="row__poster"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </Container>
  );
};

export default Row;

const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div``;
const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0/69%) 0px 26px 30px -10px, rgb(0 0 0/73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    width: 100%;
    transition: opacity 500ms ease-in-out;
    z-index: 1;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

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

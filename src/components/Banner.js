import React, { useEffect, useState } from "react";
// import axios from "axios";
// axios.js 에서 axios instance 생성해둔거 사용하기 > export default라 import 뒤에 어떤 변수명이 와도 상관없음 : import axiosInstance 도 괜찮!
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";

const Banner = () => {
  //가져올 데이터
  const [movie, setMovie] = useState([]);
  //클릭이벤트
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // data 가져오기 > axios instance 생성해둔거 사용하기
  const fetchData = async () => {
    // 현재 상영중인 영화 data
    const response = await axios.get(requests.fetchNowPlaying);
    // 영화 하나의 id 가져오기(랜덤)
    const movieId = response.data.results[Math.floor(Math.random() * response.data.results.length)].id;
    // 특정 영화 상세정보 가져오기 > 비디오 정보도 포함
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  // 영화 설명이 너무 길면 잘라주기 > str : 자를 문자열, n : 자를 길이
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  // 버튼 클릭시
  if (isClicked) {
    return (
      <>
        {" "}
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="365"
              frameborder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button
          onClick={() => {
            setIsClicked(false);
          }}
        >
          x
        </button>
      </>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>

          <div className="banner__buttons">
            {movie?.videos?.results[0]?.key && (
              <button
                className="banner__button play"
                onClick={() => {
                  setIsClicked(true);
                }}
              >
                Play
              </button>
            )}
          </div>

          <p className="banner__description">{truncate(movie.overview, 100)}</p>
        </div>

        <div className="banner--fadeBottom" />
      </header>
    );
  }
};

export default Banner;

// css
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

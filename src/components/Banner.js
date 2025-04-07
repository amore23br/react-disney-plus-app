import React, { useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/requests";

const Banner = () => {
  useEffect(() => {
    fetchData();
  }, []);

  // data 가져오기 > axios instance 생성해둔거 사용하기
  const fetchData = () => {
    const response = axios.get(requests.fetchNowPlaying);
    console.log("response", response);
  };

  return <div>Banner</div>;
};

export default Banner;

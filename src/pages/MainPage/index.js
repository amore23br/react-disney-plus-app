import React from "react";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import Category from "../../components/Category";
import Row from "../../components/Row";
import requests from "../../api/requests";
import styled from "styled-components";

const MainDefault = () => {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </Container>
  );
};

export default MainDefault;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover; no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 0;
    z-index: -1;
  }
`;

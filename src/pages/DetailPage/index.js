import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

function DetailPage() {
  // let movieId = useParams().movieId 의 단순화
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      setMovie(response.data);
    }
    // 만든 함수 call 해주기
    fetchData();
  }, [movieId]);

  if (!movie) return null;

  return (
    <section>
      <img className="modal__poster-img" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="img" />
    </section>
  );
}

export default DetailPage;

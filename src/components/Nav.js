import React, { useState, useEffect } from "react";
import styled from "styled-components";

/**
 useEffect(() => {
    first
    return () => {
      second
    }
  }, [third])

first : 로직추가
second : 사용되지 않을때 second 호출
[third] : 빈배열시 한번만 실행이지만 의존성 배열에 넣으면 그 값이 바뀔때마다 실행됨
 */

const Nav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" onClick={() => (window.location.href = "/")} />
      </Logo>
    </NavWrapper>
  );
};

export default Nav;

/**
 * styled.000 : 000은 별칭, 스타일 이름
 * style도 하나의 컴포넌트 단위처럼 생성 가능
 * styled-components 에서는 props를 내려줄 수 있음
 */
const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: between-space;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

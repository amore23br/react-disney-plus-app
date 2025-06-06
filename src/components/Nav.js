import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  const [show, setShow] = useState(false); // nav bar sho/bar
  const [searchValue, setSearchValue] = useState(""); // 검색어

  //localStorage에 저장된 userData가 있으면 가져오고 없으면 빈 객체로 초기화
  const initialUserData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
  const [userData, setUserDate] = useState(initialUserData); // user정보

  const { pathname } = useLocation();
  const navigate = useNavigate();
  // firebase auth 객체 생성
  const auth = getAuth();
  const provider = new GoogleAuthProvider(); // instance객체 생성

  // 구글 로그인시 user 정보 유무에 따른 페이지 이동
  useEffect(() => {
    // user sign-in state 변화에 대한 관찰자 추가
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") {
          navigate("/main");
        }
      } else {
        navigate("/");
      }
    });
  }, [auth, navigate, pathname]);

  // 스크롤에 따른 nav 위치 고정
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  // input change event. 값에 따른 결과값 노출
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  // 로그인버튼 클릭시 구글 로그인
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserDate(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // 로그아웃 버튼 클릭시 구글 로그아웃
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserDate({});
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" onClick={() => (window.location.href = "/")} />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={searchValue}
            className="nav__input"
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={handleChange}
          />
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleSignOut}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

/**
 * styled.000 : 000은 별칭, 스타일 이름
 * style도 하나의 컴포넌트 단위처럼 생성 가능
 * styled-components 에서는 props를 내려줄 수 있음
 */

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19)
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius:  4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
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

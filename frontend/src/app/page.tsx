'use client'

import Link from "next/link";
import styled from "styled-components";
import LoginPage from "./login/page";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function Home() {
  return (
    <Main>
      <LoginPage/>
    </Main>
  );
}

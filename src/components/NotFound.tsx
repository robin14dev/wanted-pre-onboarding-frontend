import React from "react";
import { useRouteError, Link } from "react-router-dom";

type Props = {};

export default function NotFound({}: Props) {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      NotFound 지금은 모든에러 다나타남
      <div>
        <Link to="/">메인페이지로 돌아가기</Link>
      </div>
    </div>
  );
}

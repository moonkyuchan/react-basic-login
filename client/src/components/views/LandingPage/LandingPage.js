import React, { useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  // 4000 포트에서 서버를 키고 데이터를 한번 불러와도 error가 나는 이유는? CORS..
  // 3000포트에서 4000포트로 접근하려는데 예를들어 누구나 서버 리소스에 접근하면 보안적인 이슈가 발생
  // Cors ( Cross-Origin Resource Sharing)
  // 3000과 4000,,, 같은 origin 이면 상관없겠지만... 다른 origin 은 설정을 해줘야합니다. Proxy!!

  // 클라이언트 내에서 http-proxy-middleware를 사용해도 되지만 난 서버쪽에서 허용해주겠다.
  // useEffect(() => {
  //   axios.get("/").then((res) => {
  //     console.log(
  //       "Server쪽에서 cors 허용해주고 받아와 지는지 확인!!! ---> 자알~ 된다"
  //     );
  //   });
  // }, []);
  return <div>랜딩페이지 입니다.</div>;
};

export default LandingPage;

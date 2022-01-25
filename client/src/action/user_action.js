import axios from "axios";

export const loginUser = (dataToSubmit) => {
  // dataToSubmit 파라미터는 필요한 페이지에서 dispatch안에 넣어주고

  const request = axios
    .post("http://localhost:4000/api/user/login", dataToSubmit)
    .then((res) => res.data);

  //return을 시켜서 Reducer로 보내야지!?
  return {
    type: "LOGIN_USER",
    payload: request,
  };
};

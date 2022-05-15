import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  loginUser,
  selectErr,
  selectLoading,
  setErr,
  signupUser,
} from "redux/reducers/authReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    verify: "",
  });
  const [login, setLogin] = useState(true);

  const dispatch = useDispatch();
  const error = useSelector(selectErr);
  const loading = useSelector(selectLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) return dispatch(loginUser(userInfo));

    if (userInfo.password !== userInfo.verify)
      return dispatch(setErr(`Passwords don't match`));

    dispatch(signupUser(userInfo));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <h1>LOADING...</h1>;

  return (
    <div>
      <h1>{login ? "login" : "Signup"}</h1>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:{" "}
          <input
            type="text"
            placeholder="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:{" "}
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </label>
        <br />
        {!login && (
          <label htmlFor="verify">
            Verify password:{" "}
            <input
              type="password"
              placeholder="verify"
              name="verify"
              value={userInfo.verify}
              onChange={handleChange}
            />
          </label>
        )}
        <br />
        <button type="submit">{login ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setLogin(!login)}>
        {login ? "need to sign up ?" : "already signed up?"}
      </button>
    </div>
  );
};

export default Login;

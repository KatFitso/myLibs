import Navbar from "Components/Navbar";
import CharList from "Pages/CharList";
import Login from "Pages/Login";
import Char from "Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getCookies } from "util/cookies";
import {
  getUserId,
  selectAuth,
  selectUser,
} from "./redux/reducers/authReducer";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const userId = useSelector(selectUser);

  const { token } = getCookies();
  if (token && !auth) dispatch(getUserId({ token }));

  const unprotectedRoutes = ["/"];

  if (auth && unprotectedRoutes.includes(location.pathname))
    return <Navigate to={`/charlist/${userId}`} />;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/char/:id" element={auth ? <Char /> : <Login />} />
        <Route
          path="/charlist/:user"
          element={auth ? <CharList /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;

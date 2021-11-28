import { AppRoute } from "../../const";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainScreen from "../main-screen/main-screen";
import ResultScreen from "../result-screen/result-screen";
import TrainerScreen from "../trainer-screen/trainer-screen";
import Header from "../header/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthScreen from "../auth-screen/auth-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";

function App(): JSX.Element {
  return (
      <Router>
        <Routes>
          <Route path={AppRoute.Main} element={<Header/>}>
            <Route index element={<MainScreen/>}/>
            <Route path={AppRoute.Trainer} element={<TrainerScreen/>} ></Route>
            <Route path={AppRoute.Result} element={<ResultScreen/>}></Route>
            <Route path={AppRoute.Auth} element={<AuthScreen/>}></Route>
          </Route>
          <Route path="*" element={<NotFoundScreen />}/>
        </Routes>
      </Router>
  );
}

export default App;

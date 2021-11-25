import { AppRoute } from "../../const";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainScreen from "../main-screen/main-screen";
import ResultScreen from "../result-screen/result-screen";
import TrainerScreen from "../trainer-screen/trainer-screen";
import Header from "../header/header";
import 'bootstrap/dist/css/bootstrap.min.css';

function App(): JSX.Element {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path={AppRoute.Main} element={<MainScreen/>}/>
          <Route path={AppRoute.Trainer} element={<TrainerScreen/>}></Route>
          <Route path={AppRoute.Result} element={<ResultScreen/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;

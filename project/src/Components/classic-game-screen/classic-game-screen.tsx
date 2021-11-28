import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useInterval } from "../../hooks/useInterval";
import { setResults } from "../../Store/actions";
import WinnerScreen from "../winner-screen/winner-screen";

type ClassicGameScreenProps = {
  textForUser: string,
  enteredLettersCount: number,
  accuracy: number,
  isStart: boolean,
  isCompleted: boolean,
  onRestartButtonClick: () => void,
  onChangeModeButtonClick: () => void,
}

export default function ClassicGameScreen ({textForUser, isStart, isCompleted, enteredLettersCount, accuracy, onRestartButtonClick, onChangeModeButtonClick} : ClassicGameScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const [passedTime, setPassedTime] = useState(1);
  const [speedPrint, setSpeedPrint] = useState(0);


  useInterval(() => {
    if(isStart){
      setPassedTime(passedTime + 1);
      setSpeedPrint(enteredLettersCount * 60 / passedTime);
    }
  }, 1000);

  useEffect(() => {
    if(isCompleted){
      dispatch(setResults({
        passedTime: passedTime,
        accuracy: accuracy,
        speedPrint: speedPrint,
      }));
    }
  },[isCompleted, accuracy, dispatch, passedTime, speedPrint]);

  if(isCompleted){
    return <WinnerScreen passedTime={passedTime} accuracy={accuracy} speedPrint={speedPrint} onRestartButtonClick={onRestartButtonClick} onChangeModeButtonClick={onChangeModeButtonClick}/>
  }

  return (
    <Container className='border border-succes bg-white p-3 content-area'>
      <Row>
        <Col lg="9" md="8">
        <div className="fs-2 p-2">
          <p id='text' dangerouslySetInnerHTML={{__html: textForUser}}></p>
        </div>
        </Col>
        <Col className="text-success">
          <div >
            <p className="fs-5 mb-0">скорость</p>
            <p className="fs-4"><span className="fs-1">{Math.floor(speedPrint)}</span> зн./минуту</p>
          </div>
          <div >
            <p className="fs-5 mb-0">точность</p>
            <p className="fs-1">{accuracy} %</p>
            <Button variant="success" onClick={onRestartButtonClick} size="sm" className="me-3">начать заново</Button>
            <Button variant="success" onClick={onChangeModeButtonClick} size="sm" className="">сменить режим</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
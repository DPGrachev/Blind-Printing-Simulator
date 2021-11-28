import {  useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useInterval } from "../../hooks/useInterval";
import LoseScreen from '../lose-screen/lose-screen'
import WinnerScreen from "../winner-screen/winner-screen";

type ArcadeGameScreenProps = {
  textForUser: string,
  isStart: boolean,
  isCompleted: boolean,
  mistakeCount: number,
  onRestartButtonClick: () => void,
  onChangeModeButtonClick: () => void,
}

export default function ArcadeGameScreen ({textForUser, isStart, isCompleted, mistakeCount, onRestartButtonClick, onChangeModeButtonClick} : ArcadeGameScreenProps): JSX.Element {
  const MAX_MISTAKES = 3;

  const [remainingTime, setRemainingTime] = useState(60);
  const lives = new Array(MAX_MISTAKES - mistakeCount).fill('');
  
  useInterval(() => {
    if(isStart){
      setRemainingTime(remainingTime - 1);
    }
  }, 1000)

  if(remainingTime === 0 || mistakeCount === MAX_MISTAKES){
    return <LoseScreen onRestartButtonClick={onRestartButtonClick} onChangeModeButtonClick={onChangeModeButtonClick} />
  }

  if(isCompleted){
    return <WinnerScreen onRestartButtonClick={onRestartButtonClick} onChangeModeButtonClick={onChangeModeButtonClick}/>
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
            <p className="fs-5 mb-0">оставшееся время</p>
            <p className="fs-4"><span className="fs-1">{remainingTime}</span> сек.</p>
          </div>
          <div >
            <p className="fs-5 mb-0">жизни</p>
            <Row className="mb-2">
              {lives.map((item, i) => <Col md={3} xs={2}><img src="./image/heart.svg" alt="heart" key={item + i}/></Col>)}
            </Row>
            <Button variant="success" onClick={onRestartButtonClick} size="sm" className="me-3">начать заново</Button>
            <Button variant="success" onClick={onChangeModeButtonClick} size="sm" className="">сменить режим</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
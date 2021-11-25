import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import {useKeydownEvent} from "../../hooks/useEvent";
import { useInterval } from "../../hooks/useInterval";
import { setResults } from "../../Store/actions";
import Loading from "../loading/loading";
import WinnerScreen from "../winner-screen/winner-screen";

export default function TrainerScreen (): JSX.Element {

  const [textForTest, setTextForTest] = useState('');
  const [speedPrint, setSpeedPrint] = useState(0);
  const [enteredLettersCount, setEnteredLettersCount] = useState(0);
  const [passedTime, setPassedTime] = useState(1);
  const [isSameMistake, setIsSameMistake] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [textForUser, setTextForUser] = useState(textForTest);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRestart, setIsRestart] = useState(false)
  const dispatch = useDispatch();

  if(!isCompleted && enteredLettersCount && enteredLettersCount === textForTest.length){
    setIsCompleted(true);
  }

  const markedLetter = useCallback(
    (index: number, color: string) => {
      const arr = textForTest.split('');
      arr[index] = `<span style="color: white; background: ${color}">${textForTest[index]}</span>`;
      setTextForUser(arr.join(''));
    },
    [textForTest],
  );

  const onRestartButtonClick = () => {
    setTextForTest('');
    setSpeedPrint(0);
    setEnteredLettersCount(0);
    setPassedTime(1);
    setCurrentLetterIndex(0);
    setTextForUser('');
    setAccuracy(100);
    setIsCompleted(false);
    setIsRestart(true);
  }

  const checkedValid = (evt: KeyboardEvent) => {
    if(evt.key.length === 1 && evt.key === textForTest[currentLetterIndex]){
      if(isSameMistake){setIsSameMistake(false)}

      setCurrentLetterIndex((currentLetterIndex) => currentLetterIndex + 1);
      setEnteredLettersCount((enteredLettersCount) => enteredLettersCount + 1);
      markedLetter(currentLetterIndex + 1, 'green');

    }else if(evt.key.length === 1 && !isSameMistake){
      markedLetter(currentLetterIndex, 'red');
      const newAccuracy = accuracy - (100 / textForTest.length);
      setAccuracy(Math.floor(10 * newAccuracy)/10);
      setIsSameMistake(true);
    }
  }
  useInterval(() => {
    if(enteredLettersCount && !isCompleted){
      setPassedTime(passedTime + 1);
      setSpeedPrint(enteredLettersCount * 60 / passedTime);
    }
  }, 1000)

  useEffect(() => {
    if(isCompleted){
      dispatch(setResults({
        passedTime: passedTime,
        accuracy: accuracy,
        speedPrint: speedPrint,
      }));
    }
  },[isCompleted, accuracy, dispatch, passedTime, speedPrint])

  useEffect(() => {
    markedLetter(0, 'green');
    
  },[markedLetter])
  
  useEffect(()=> {
    if(!textForTest.length || isRestart){
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=${Math.floor(Math.random() * 50)}`)
      .then((response) => response.json())
      .then((response) => {
        setTextForTest(response[0]);
        setTextForUser(response[0]);
      });
      setIsRestart(false);
    }
  },[isRestart, textForTest])

  useKeydownEvent('keydown', checkedValid)

  return (
    <div>
      {isCompleted &&
        <WinnerScreen passedTime={passedTime} accuracy={accuracy} speedPrint={speedPrint} onRestartButtonClick={onRestartButtonClick}/>
      }
      
      {!textForTest && !isCompleted
        && <Loading />
      }
      {textForTest && !isCompleted
        &&  <Container className='border border-succes bg-white p-3 content-area'>
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
                    <Button variant="success" onClick={onRestartButtonClick} size="sm" className=""> начать заново</Button>
                  </div>
                </Col>
              </Row>
            </Container>
      }
    </div>
  )
}
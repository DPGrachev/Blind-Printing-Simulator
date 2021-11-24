import { useState, useEffect } from "react";
import { Container} from 'react-bootstrap';
import useKeydownEvent from "../../hooks/useEvent";
import { useInterval } from "../../hooks/useInterval";

export default function TrainerScreen (): JSX.Element {
  const textForTest = 'Привет! Это тестовый текст для тренеровки печати';
  const oneSymbolWeight = textForTest.length / 100;

  const [speedPrint, setSpeedPrint] = useState(0);
  const [enteredLettersCount, setEnteredLettersCount] = useState(0);
  const [passedTime, setPassedTime] = useState(1);
  const [isSameMistake, setIsSameMistake] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [text, setText] = useState(textForTest)
  const [accuracy, setAccuracy] = useState(100)

  const checkedValid = (evt: KeyboardEvent) => {
    if(evt.key.length === 1 && evt.key === textForTest[currentLetterIndex]){
      if(isSameMistake){setIsSameMistake(false)}
      setCurrentLetterIndex(currentLetterIndex + 1);
      setEnteredLettersCount(enteredLettersCount + 1);
      
      markedLetter(currentLetterIndex + 1, 'green');
    }else if(evt.key.length === 1 && !isSameMistake){
      markedLetter(currentLetterIndex, 'red');
      const newAccuracy = accuracy - oneSymbolWeight;
      setAccuracy(Number(newAccuracy.toFixed(1)));
      setIsSameMistake(true);
    }
  }
  useInterval(() => {
    if(enteredLettersCount){
      console.log(passedTime)
      setPassedTime(passedTime + 1);
      setSpeedPrint(enteredLettersCount * 60 / passedTime);
    }
  }, 1000)

  

  const markedLetter = (index: number, color: string) => {
    const arr = textForTest.split('');
    arr[index] = `<span style="color: white; background: ${color}">${textForTest[index]}</span>`;
    setText(arr.join(''));
  }
  
  useEffect(()=> {
    markedLetter(0, 'green');
  },[])

  useKeydownEvent('keydown', checkedValid)

  return (
    <div>
      <Container>
        <div className="fs-1 border border-primary rounded w-50">
          <p id='text' dangerouslySetInnerHTML={{__html: text}}></p>
        </div>
        <div>
          <h1>{accuracy} % Точности</h1>
        </div>
        <div>
          <h1>{Math.floor(speedPrint)} зн./минуту</h1>
        </div>
      </Container>
    </div>
  )
}
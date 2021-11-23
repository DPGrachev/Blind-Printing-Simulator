import { useState, useEffect } from "react";
import { Container} from 'react-bootstrap';




export default function TrainerScreen (): JSX.Element {
  let currentLetterIndex = 0;
  const textForTest = 'Привет! Это тестовый текст для тренеровки печати';


  const [text, setText] = useState(textForTest)
  const markedLetter = (index: number, color: string) => {
    const arr = textForTest.split('');
    arr[index] = `<span style="color: white; background: ${color}">${textForTest[index]}</span>`;
    setText(arr.join(''));
  }
  
  const body = document.querySelector('body');
  useEffect(() => {
    markedLetter(0, 'green')
    if(body){
      body.addEventListener('keydown', (evt: KeyboardEvent) => {

        if(evt.key.length === 1 && evt.key === textForTest[currentLetterIndex]){
          console.log(evt.key)
          currentLetterIndex++;
          markedLetter(currentLetterIndex, 'green');
        }else if(evt.key.length === 1){
          markedLetter(currentLetterIndex, 'red');
        }
      }, true)
    }
  }, [body])
    
  
  



  return (
    <div>
      <Container>
        <div className="fs-1 border border-primary rounded w-50">
          <p id='text' dangerouslySetInnerHTML={{__html: text}}></p>
        </div>
      </Container>
    </div>
  )
}
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useKeydownEvent} from "../../hooks/useEvent";
import { setGameMode} from "../../Store/actions";
import Loading from "../loading/loading";
import ClassicGameScreen from "../classic-game-screen/classic-game-screen";
import { getGameMode } from "../../Store/selectors";
import { GameMode } from "../../const";
import GameModeScreen from "../game-mode-screen/game-mode-screen";
import ArcadeGameScreen from "../arcade-game-screen/arcade-game-screen";

export default function TrainerScreen (): JSX.Element {

  const [textForTest, setTextForTest] = useState('');
  const [enteredLettersCount, setEnteredLettersCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isSameMistake, setIsSameMistake] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [textForUser, setTextForUser] = useState(textForTest);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isRestart, setIsRestart] = useState(false)
  const dispatch = useDispatch();

  const gameMode = useSelector(getGameMode);

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
    setEnteredLettersCount(0);
    setCurrentLetterIndex(0);
    setMistakeCount(0);
    setTextForUser('');
    setAccuracy(100);
    setIsCompleted(false);
    setIsRestart(true);
  }

  const onChangeModeButtonClick = () => {
    onRestartButtonClick();
    dispatch(setGameMode(GameMode.None));
  }

  const checkedValid = (evt: KeyboardEvent) => {
    if(evt.key.length === 1 && evt.key === textForTest[currentLetterIndex]){
      if(isSameMistake){setIsSameMistake(false)}

      setCurrentLetterIndex((currentLetterIndex) => currentLetterIndex + 1);
      setEnteredLettersCount((enteredLettersCount) => enteredLettersCount + 1);
      markedLetter(currentLetterIndex + 1, 'green');

    }else if(evt.key.length === 1 && !isSameMistake){
      markedLetter(currentLetterIndex, 'red');
      setIsSameMistake(true);
      if(gameMode === GameMode.Classic){
        const newAccuracy = accuracy - (100 / textForTest.length);
        setAccuracy(Math.floor(10 * newAccuracy)/10);
      }
      if(gameMode === GameMode.Arcade){
        setMistakeCount((mistakeCount) => mistakeCount + 1);
      }

    }
  }


  useEffect(() => {
    if(enteredLettersCount && !isCompleted){
      setIsStart(true);
    }else{
      setIsStart(false);
    }
  }, [enteredLettersCount, isCompleted])


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

  useKeydownEvent('keydown', checkedValid);

  window.addEventListener('beforeunload',onChangeModeButtonClick);

  if(gameMode === GameMode.None){
    return <GameModeScreen />;
  }


  return (
    <div>
      {!textForTest && !isCompleted
        && <Loading />
      }
      {textForTest && gameMode === GameMode.Classic
        &&  <ClassicGameScreen isCompleted={isCompleted} textForUser={textForUser} isStart={isStart} enteredLettersCount={enteredLettersCount} accuracy={accuracy} onRestartButtonClick={onRestartButtonClick} onChangeModeButtonClick={onChangeModeButtonClick}/>
      }
      {textForTest && gameMode === GameMode.Arcade
        &&  <ArcadeGameScreen isCompleted={isCompleted} textForUser={textForUser} isStart={isStart} mistakeCount={mistakeCount} onRestartButtonClick={onRestartButtonClick} onChangeModeButtonClick={onChangeModeButtonClick}/>
      }
    </div>
  )
}
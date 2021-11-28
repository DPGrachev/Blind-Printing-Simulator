import { MouseEvent } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GameMode } from "../../const";
import { setGameMode } from "../../Store/actions";

export default function GameModeScreen ():JSX.Element {
  const dispatch = useDispatch();

  const onGameModeClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if(evt.currentTarget.dataset.mode){
      dispatch(setGameMode(evt.currentTarget.dataset.mode as GameMode))
    }
  }

  return (
    <Container className="text-center bg-success border-radius text-white pt-2 pb-1">
      <h1>ВЫБЕРИТЕ РЕЖИМ ТРЕНАЖЕРА</h1>
      <Row>
        <Col className="m-lg-5 mt-lg-0 m-md-3 mt-md-0">
          <Card className="game-mode-card">
            <Card.Header className="game-mode-title">КЛАССИЧЕСКИЙ</Card.Header>
            <Card.Body className="game-mode-body">
              <Card.Title>Проверьте скорость своей печати</Card.Title>
              <Card.Text >
                время не ограничено<br/>
                колличество ошибок не ограниченно<br/>
                измеряет сорость печати и аккуратность<br/>
                результаты сохраняются<br/>
              </Card.Text>
              <Button className="game-mode-button" data-mode={GameMode.Classic} onClick={onGameModeClick}>ВЫБРАТЬ</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="m-lg-5 mt-lg-0 m-md-3 mt-md-0">
          <Card className="h-100 game-mode-card">
            <Card.Header className="game-mode-title">ИГРОВОЙ</Card.Header>
            <Card.Body className="game-mode-body">
              <Card.Title>Проверка на внимательность</Card.Title>
              <Card.Text>
                время ограничено(1 минута)<br/>
                3 жизни<br/>
                результаты не сохраняются<br/>              
              </Card.Text>
              <Button className="game-mode-button" data-mode={GameMode.Arcade} onClick={onGameModeClick}>ВЫБРАТЬ</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}
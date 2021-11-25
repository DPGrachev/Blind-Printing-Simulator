import { Container, Row, Col, Button} from 'react-bootstrap';

type WinnerScreenProps = {
  passedTime: number,
  accuracy: number,
  speedPrint: number,
  onRestartButtonClick: () => void;
}

export default function WinnerScreen ({passedTime, accuracy, speedPrint, onRestartButtonClick}: WinnerScreenProps): JSX.Element {
  return (
    <Container className='border border-succes bg-white p-3 content-area text-center text-success'>
      <h1>Поздравляем, вы справились!!!</h1>
      <h2>Ваши результаты:</h2>
      <div className="border border-success bg-light mb-5">
        <Row >
          <Col>
            <p>Затраченное время</p>
            <p>{passedTime} сек.</p>
          </Col>
          <Col className="border-end border-success border-start">
              <p className="fs-5 mb-0">скорость</p>
              <p className="fs-4"><span className="fs-1">{Math.floor(speedPrint)}</span> зн./минуту</p>
          </Col>
          <Col>
              <p className="fs-5 mb-0">точность</p>
              <p className="fs-1">{accuracy} %</p>
          </Col>
        </Row>
      </div>
      <Button variant="success" onClick={onRestartButtonClick} size="sm" className=""> начать заново</Button>
    </Container>
  )
}
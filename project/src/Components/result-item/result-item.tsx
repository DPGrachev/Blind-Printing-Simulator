import { Row, Col } from "react-bootstrap";

type ResultItemProps = {
  passedTime: number,
  accuracy: number,
  speedPrint: number,
  tryNumber: number,
}

export default function ResultItem ({passedTime, accuracy, speedPrint,  tryNumber}:ResultItemProps): JSX.Element {
  return(
    <div className="result-info border border-success mb-2">
        <Row className="align-self-center">
          <Col className="align-self-center border-end border-success">
            <p>ПОПЫТКА</p>
          </Col>
          <Col className="align-self-center border-end border-success">
            <p>ЗАТРАЧЕННОЕ<br/>ВРЕМЯ</p>
          </Col>
          <Col className="align-self-center border-end border-success">
              <p >СКОРОСТЬ</p>
          </Col>
          <Col className="align-self-center">
              <p >ТОЧНОСТЬ</p>
          </Col>
        </Row>
        <Row >
          <Col className="border-end border-success">
            <p>{tryNumber}</p>
          </Col>
          <Col className="border-end border-success">
            <p>{passedTime} сек.</p>
          </Col>
          <Col className="border-end border-success ">
              <p className="fs-4"><span className="fs-1">{Math.floor(speedPrint)}</span> зн./минуту</p>
          </Col>
          <Col>
              <p className="fs-1">{accuracy} %</p>
          </Col>
        </Row>
      </div>
  )
}
import { Container, Button} from 'react-bootstrap';

type LoseScreenProps = {
  onRestartButtonClick: () => void;
  onChangeModeButtonClick: () => void,
}

export default function LoseScreen ({onRestartButtonClick, onChangeModeButtonClick}: LoseScreenProps): JSX.Element {
  return (
    <Container className='border border-succes bg-white p-3 content-area text-center text-success'>
      <h1 className="mb-5">GAME OVER</h1>
      <Button variant="success" onClick={onRestartButtonClick} size="sm" className="me-3">начать заново</Button>
      <Button variant="success" onClick={onChangeModeButtonClick} size="sm" className="">сменить режим</Button>
    </Container>
  )
}
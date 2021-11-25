import { Container, Spinner} from 'react-bootstrap';

export default function Loading (): JSX.Element {
  return (
    <Container className="d-flex align-items-center flex-column">
      <Spinner animation="border" variant="success"/>
      <h1 className="text-success">Loading...</h1>
    </Container>
  )
}
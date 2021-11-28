import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";


export default function NotFoundScreen ():JSX.Element {
  return (
    <Container className="text-center bg-success border-radius text-white pt-2 pb-1">
      <h3>Такой страницы не существует</h3>
      <Button size="sm" className="mt-3 mb-3 auth-button"><Link to={AppRoute.Main} className="text-decoration-none text-white">ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link></Button>
  </Container>
  )
}
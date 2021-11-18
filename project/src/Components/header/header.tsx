import {Nav, Navbar, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { AppRoute } from '../../const';

export default function Header () :JSX.Element {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
      <Container>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link><Link to={AppRoute.Main} className="text-decoration-none text-white fs-4">ГЛАВНАЯ</Link></Nav.Link>
          <Nav.Link><Link to={AppRoute.Trainer} className="text-decoration-none text-white fs-4">ТРЕНАЖЕР</Link></Nav.Link>
          <Nav.Link><Link to={AppRoute.Result} className="text-decoration-none text-white fs-4">РЕЗУЛЬТАТЫ</Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
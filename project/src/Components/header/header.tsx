import {Nav, Navbar, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { AppRoute } from '../../const';

export default function Header () :JSX.Element {
  return (
    <>
    <Container className='p-0'>
      <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" className='rounded header'>
        <Navbar.Brand>BPS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to={AppRoute.Main} className="text-decoration-none text-white fs-4">ГЛАВНАЯ</Nav.Link>
            <Nav.Link as={Link} to={AppRoute.Trainer} className="text-decoration-none text-white fs-4">ТРЕНАЖЕР</Nav.Link>
            <Nav.Link as={Link} to={AppRoute.Result} className="text-decoration-none text-white fs-4">РЕЗУЛЬТАТЫ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
    </>
  )
}
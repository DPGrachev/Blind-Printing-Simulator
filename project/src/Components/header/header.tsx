import {Nav, Navbar, Container, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { AppRoute, AuthStatus } from '../../const';
import { onLogout } from '../../Store/actions';
import { getAuthStatus, getUserName } from '../../Store/selectors';

export default function Header () :JSX.Element {
  const dispatch = useDispatch()
  const authStatus = useSelector(getAuthStatus);
  const userName = useSelector(getUserName);

  const onLogoutClick = () => {
    dispatch(onLogout());
  }

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
        {
          authStatus === AuthStatus.Auth
            ?<>
              <Navbar.Text>{userName}</Navbar.Text>
              <Button variant="success" onClick={onLogoutClick} size="sm" className="">ВЫЙТИ</Button>
            </>
            :<Nav.Link as={Link} to={AppRoute.Auth} className="text-decoration-none text-white fs-4">ВОЙТИ</Nav.Link>
        }
          
      </Navbar>
    </Container>
    </>
  )
}
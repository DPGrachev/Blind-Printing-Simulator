import { FormEvent, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import { AppRoute, AuthStatus } from "../../const";
import { onLogin, setUserName } from "../../Store/actions";
import { getAuthStatus } from "../../Store/selectors";

export default function AuthScreen(): JSX.Element {
  const userName = useRef<HTMLInputElement | null>(null);
  const userStatus = useSelector(getAuthStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    if(userName.current){
      evt.preventDefault();
      dispatch(setUserName(userName.current.value));
      dispatch(onLogin());
    }
  }

  if(userStatus === AuthStatus.Auth){
    navigate(AppRoute.Main);
  }

  return (
    <Container className="text-center bg-success border-radius text-white pt-2 pb-1">
      <h1>АВТОРИЗАЦИЯ</h1>
      <div className="w-50 mx-auto">
        <Form className="mb-3" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control ref={userName} type="email" placeholder="Enter email" required minLength={6}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required minLength={6}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      
    </Container>
  )
}
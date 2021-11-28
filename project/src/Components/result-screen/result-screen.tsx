import { Container, Button} from "react-bootstrap";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { AppRoute, AuthStatus } from "../../const";
import { getAuthStatus, getResultsTrain } from "../../Store/selectors"
import ResultItem from "../result-item/result-item";


export default function ResultScreen (): JSX.Element {
  const results = useSelector(getResultsTrain);
  const userStatus = useSelector(getAuthStatus);

  if(userStatus === AuthStatus.NoAuth){
    return (
      <Container className="text-center bg-success border-radius text-white pt-2 pb-1">
        <h3>Для сохранения и просмотра результатов<br/> необходимо авторизоваться</h3>
        <Button size="sm" className="mt-3 mb-3 auth-button"><Link to={AppRoute.Auth} className="text-decoration-none text-white">ВОЙТИ</Link></Button>
      </Container>
    )
  }

  return (
    <Container className="text-center bg-success border-radius text-white pt-2 pb-1">
      {!results.length
        ?<h3>ЗДЕСЬ БУДУТ РЕЗУЛЬТАТЫ ВАШИХ ТРЕНЕРОВОК</h3>
        :<>
          <h3>ВАШИ РЕЗУЛЬТАТЫ</h3>
          {results.map((result, i) => 
            <ResultItem 
            passedTime={result.passedTime}
            accuracy={result.accuracy}
            speedPrint={result.speedPrint}
            tryNumber={i+1}/>)}
        </>
      }          
    </Container>
    
  )
}
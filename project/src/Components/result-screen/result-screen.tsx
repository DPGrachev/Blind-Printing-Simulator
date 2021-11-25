import { Container} from "react-bootstrap";
import { useSelector } from "react-redux"
import { getResultsTrain } from "../../Store/selectors"
import ResultItem from "../result-item/result-item";


export default function ResultScreen (): JSX.Element {
  const results = useSelector(getResultsTrain);

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
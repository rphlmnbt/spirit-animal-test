import { useState } from "react";
import Container from 'react-bootstrap/Container';
import './style.css'
import { Card } from "react-bootstrap";
import Questions from "../../components/questions";
import Results from "../../components/results";

const Questionnaire = () => {
  const [probabilities, setProbabilities] = useState<number[]>([])
  const [result, setResult] = useState<string>('')
  const [showResults, setShowResults] = useState<boolean>(false)

  return (
    <Container className="main-container">
      <Card className="card">
        {
          showResults === false &&
          <Questions 
            setResult={setResult}
            setProbabilities={setProbabilities}
            setShowResults={setShowResults}
          />
        }
        {
          showResults === true &&
          <Results
            result={result}
            probabilities={probabilities}
            showResults={showResults}
          />
        }
      </Card>
      
    </Container>
  )
}

export default Questionnaire;
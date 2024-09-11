import { useState } from "react";
import Container from 'react-bootstrap/Container';
import './style.css'
import { Card, Col } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Questions from "../../components/questionnaire";

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
          <Card.Body>
            <Card.Title className="resultTitle">Your Spirit Animal is the {result}!</Card.Title>
            <hr></hr>
            <Card.Text style={{display: 'flex', alignItems: 'center'}}>
              <Col xs={2} >
                <span>Beaver</span>
              </Col>
              <Col xs={10}>
                <ProgressBar variant="warning" className="success" now={probabilities[0]*100} label={`${(probabilities[0]*100).toFixed(2)}%`} />
              </Col>
            </Card.Text>
            <Card.Text style={{display: 'flex', alignItems: 'center'}}>
              <Col xs={2} >
                <span>Raven</span>
              </Col>
              <Col xs={10}>
                <ProgressBar className="success"  now={probabilities[2]*100} label={`${(probabilities[2]*100).toFixed(2)}%`} />
              </Col>
            </Card.Text>
            <Card.Text style={{display: 'flex', alignItems: 'center'}}>
              <Col xs={2} >
                <span>Lion</span>
              </Col>
              <Col xs={10}>
                <ProgressBar variant="danger" className="success"  now={probabilities[1]*100} label={`${(probabilities[1]*100).toFixed(2)}%`} />
              </Col>
            </Card.Text>
          </Card.Body>
        }
      </Card>
      
    </Container>
  )
}

export default Questionnaire;
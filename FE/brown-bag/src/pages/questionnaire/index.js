import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import './style.css'
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Questionnaire = () => {
  const questionArray = [
    'What type of environment do you feel most connected to?',
    'Which characteristic best describes you?',
    'How do you typically approach challenges?',
    'What role do you often find yourself playing in group settings?',
    'When facing adversity, what is your instinctual reaction?'
  ]

  const firstChoiceArray = [
    'Wide-open spaces, grasslands, or savannas',
    'Leadership and strength',
    'Head-on, with courage and assertiveness',
    'The leader or protector',
    'Confront it directly and fearlessly'
  ]

  const secondChoiceArray = [
    'Woodlands, fields, or underground burrows',
    'Determination and resilience',
    'Tenaciously, never backing down',
    'The steadfast supporter or the one who digs deep',
    'Persist through it with determination and grit'
  ]

  const thirdChoiceArray = [
    'Dense forests or mountainous regions',
    'Intelligence and adaptability',
    'Strategically, with wit and cunning',
    'The observer or the one offering creative solutions',
    'Use intellect and trickery to overcome obstacles'
  ]

  const firstChoiceValues = [
    'grasslands',
    'leadership',
    'headon',
    'leader',
    'confront'
  ]

  const secondChoiceValues = [
    'woodlands',
    'determination',
    'tenaciously',
    'supporter',
    'persist'
  ]

  const thirdChoiceValues = [
    'forests',
    'intelligence',
    'strategically',
    'observer',
    'intellect'
  ]

  const features = [
    'environment',
    'characteristic',
    'challenge_approach',
    'role',
    'adversity_reaction'
  ]

  const [count, setCount] = useState(0)
  const [environment, setEnvironment] = useState('')
  const [characteristic, setCharacteristic] = useState('')
  const [challengeApproach, setChallengeApproach] = useState('')
  const [role, setRole] = useState('')
  const [adversityReaction, setAdversityReaction] = useState('')
  const [probabilities, setProbabilities] = useState([])
  const [result, setResult] = useState('')
  const [showResults, setShowResults] = useState(false)


  const onNext = () => {
    setCount(count + 1)
  }

  const onBack = () => {
    count > 0 && setCount(count - 1)
  }

  const onSelect = (event) => {
    features[count] === 'environment' && setEnvironment(event.target.value)
    features[count] === 'characteristic' && setCharacteristic(event.target.value)
    features[count] === 'challenge_approach' && setChallengeApproach(event.target.value)
    features[count] === 'role' && setRole(event.target.value)
    features[count] === 'adversity_reaction' && setAdversityReaction(event.target.value)
  }
  const getResults = (answers) => {
    axios.post('http://localhost:8081/ml/probability', {
      answers: answers,
    })
    .then(function (response) {
      console.log(response);
      setProbabilities(response.data.probabilities)
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('http://localhost:8081/ml', {
      answers: answers,
    })
    .then(function (response) {
      console.log(response);
      setResult(response.data.result[0])
      setShowResults(true)
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  

  return (
    <Container className="main-container">
      <Card className="card">
        {
          showResults === false &&
          <Card.Body>
            <Card.Title className="question">{questionArray[count]}</Card.Title>
            <hr></hr>
            <Card.Text className="answer">
              <Form.Check
                type='radio'
                value={firstChoiceValues[count]}
                label={' ' + firstChoiceArray[count]}
                name={features[count]}
                onClick={onSelect}
              />
            </Card.Text>
            <Card.Text className="answer">
              <Form.Check
                type='radio'
                value={secondChoiceValues[count]}
                label={' ' + secondChoiceArray[count]}
                name={features[count]}
                onClick={onSelect}
              />
            </Card.Text>
            <Card.Text className="answer">
              <Form.Check
                type='radio'
                value={thirdChoiceValues[count]}
                label={' ' + thirdChoiceArray[count]}
                name={features[count]}
                onClick={onSelect}
              />
            </Card.Text>
            <div className="btn-container">
              {
                count > 0 &&
                <Button className="btn-custom-secondary" onClick={onBack}>
                  BACK
                </Button>
              }
              {
                count < 4 &&
                <Button className="btn-custom" onClick={onNext}>
                  NEXT
                </Button>
              }
              {
                count == 4 &&
                <Button className="btn-custom" onClick={event => getResults([environment, characteristic, challengeApproach, role, adversityReaction])}>
                  SUBMIT
                </Button>
              }
            </div>
          </Card.Body>
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
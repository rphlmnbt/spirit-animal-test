import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import './style.css'
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const [count, setCount] = useState(0)

  const navigate = useNavigate()


  const onNext = () => {
    setCount(count + 1)
  }

  const onBack = () => {
    count > 0 && setCount(count - 1)
  }

  return (
    <Container className="container">
      <Card className="card">
        <Card.Body>
          <Card.Title className="question">{questionArray[count]}</Card.Title>
          <hr></hr>
          <Card.Text className="answer">
            <Form.Check
              type='radio'
              label={' ' + firstChoiceArray[count]}
            />
          </Card.Text>
          <Card.Text className="answer">
            <Form.Check
              type='radio'
              label={' ' + secondChoiceArray[count]}
            />
          </Card.Text>
          <Card.Text className="answer">
            <Form.Check
              type='radio'
              label={' ' + thirdChoiceArray[count]}
            />
          </Card.Text>
          <div className="btn-container">
            {
              count > 0 &&
              <Button variant="primary" className="back" onClick={onBack}>
                BACK
              </Button>
            }
            {
              count < 4 &&
              <Button variant="primary" className="next" onClick={onNext}>
                NEXT
              </Button>
            }
          </div>
        </Card.Body>
      </Card>
      
    </Container>
  )
}

export default Questionnaire;
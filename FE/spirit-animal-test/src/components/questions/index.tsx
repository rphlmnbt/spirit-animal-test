import { ChangeEvent, useState } from "react";
import './style.css'
import { Button, Card, Form } from "react-bootstrap";
import axios from 'axios';
import { questionArray, firstChoiceArray, secondChoiceArray, thirdChoiceArray, firstChoiceValues, secondChoiceValues, thirdChoiceValues, features } from "../../utility/constants";
import { IQuestionProps } from "../../interfaces/interfaces";

const Questions = (props: IQuestionProps) => {
  const { setResult, setProbabilities, setShowResults } = props;
  const [count, setCount] = useState<number>(0);
  const [environment, setEnvironment] = useState<string>('');
  const [characteristic, setCharacteristic] = useState<string>('');
  const [challengeApproach, setChallengeApproach] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [adversityReaction, setAdversityReaction] = useState<string>('');

  const onNext = () => {
    setCount(count + 1);
  }

  const onBack = () => {
    count > 0 && setCount(count - 1);
  }

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    features[count] === 'environment' && setEnvironment(event.target.value);
    features[count] === 'characteristic' && setCharacteristic(event.target.value);
    features[count] === 'challenge_approach' && setChallengeApproach(event.target.value);
    features[count] === 'role' && setRole(event.target.value);
    features[count] === 'adversity_reaction' && setAdversityReaction(event.target.value);
  }

  const getResults = (answers: string[]) => {
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
    <Card.Body>
        <Card.Title className="question">{questionArray[count]}</Card.Title>
        <hr />
        <Card.Text className="answer">
            <Form.Check
              type='radio'
              value={firstChoiceValues[count]}
              label={' ' + firstChoiceArray[count]}
              name={features[count]}
              onChange={(e) => onSelect(e)}
            />
        </Card.Text>
        <Card.Text className="answer">
            <Form.Check
              type='radio'
              value={secondChoiceValues[count]}
              label={' ' + secondChoiceArray[count]}
              name={features[count]}
              onChange={(e) => onSelect(e)}
            />
        </Card.Text>
        <Card.Text className="answer">
            <Form.Check
              type='radio'
              value={thirdChoiceValues[count]}
              label={' ' + thirdChoiceArray[count]}
              name={features[count]}
              onChange={(e) => onSelect(e)}
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
  )
}

export default Questions;
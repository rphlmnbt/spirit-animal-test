import { Card, Col, ProgressBar } from "react-bootstrap"
import { IResultsProps } from "../../interfaces/interfaces"

const Results = (props: IResultsProps) => {
    const { result, probabilities, showResults } = props;
    return (
        <Card.Body>
            <Card.Title className="resultTitle">Your Spirit Animal is the {result}!</Card.Title>
            <hr />
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
    )
}

export default Results;
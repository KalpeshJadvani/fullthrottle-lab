import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loan: '',
      month: ''
    };
    this.handleCalulate = this.handleCalulate.bind();
    this.handleChangOnControlForm = this.handleChangOnControlForm.bind();
  }

  handleChangOnControlForm = e =>
    this.setState({ [e.target.name]: e.target.value });

  handleCalulate = () => {
    const { loan, month } = this.state;

    if (loan > 5000 || loan < 500 || month < 6 || month > 24) {
      return;
    }

    this.setState({ isLoading: true }, () => {
      this.getCaculateLoanData();
    });
  };

  getCaculateLoanData = () => {
    const { loan, month } = this.state;
    fetch(
      `https://ftl-frontend-test.herokuapp.com/interest?amount=${loan}&numMonths=${month}`
    )
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        this.setState({ isLoading: false });
      })
      .catch(err => console.error('Err in Api ', err));
  };

  render() {
    const { isLoading, loan, month } = this.state;
    console.log(loan);
    console.log(month);
    return (
      <div>
        <Container>
          <Row>
            <Col sm>
              <span>&nbsp;</span>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <span>&nbsp;</span>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <h3 className="text-center text-monospace">
                The loan calculator
              </h3>
            </Col>
          </Row>

          <Row>
            <Col sm>
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-monospace">
                    The loan amount should be between $500 and $5000.
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        $
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="number"
                      placeholder="Enter loan amount"
                      name="loan"
                      value={loan}
                      onChange={this.handleChangOnControlForm}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="text-monospace">
                    The number of months should be between 6 to 24.
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        <FontAwesomeIcon icon={faCalendar} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="number"
                      placeholder="Pesle enter months duration of loan amount"
                      name="month"
                      value={month}
                      onChange={this.handleChangOnControlForm}
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col sm></Col>
            <Col sm>
              <Button
                type="submit"
                disabled={isLoading}
                onClick={!isLoading ? this.handleCalulate : null}
                className="text-monospace float-right"
              >
                {isLoading ? 'Loading…' : 'Click to Calculat'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <span>&nbsp;</span>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <Badge variant="secondary">NOTE.</Badge>
              <p className="text-monospace">
                The user interface that allows a user to enter a loan amount
                and  loan duration in months which then displays the interest
                rate and the monthly payment.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Desktop;

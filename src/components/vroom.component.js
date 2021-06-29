import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';

import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot/dist/react-simple-chatbot';

class Review extends Component {
    constructor(props) {
      super(props);
      this.calculateBMI = this.calculateBMI.bind(this);
      this.getBMI = this.getBMI.bind(this);
      this.triggerNext = this.triggerNext.bind(this);
  
      this.state = {
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        trigger: false
        // bmi: '',
        // bmiClass: ''
      };
    }

    
  
    componentWillMount() {       
        const { steps } = this.props;
        const { name, gender, age, height, weight, bmi, bmiClass } = steps;
    
        this.setState({ name, gender, age, height, weight, bmi, bmiClass });

        function calculateBMI() {
            let bmiValue = ( this.state.weight / this.state.height) / this.state.height;
            this.setState({ bmi : bmiValue });
            let bmiClass = this.getBMI(bmiValue);
            this.setState({ bmiClass : bmiClass });
            console.log(bmi, bmiClass)
        }
    
        function getBMI(bmi) {
            if(bmi < 18.5) {
                return "Underweight";
            }
            if(bmi >= 18.5 && bmi < 24.9) {
                return "Normal weight";
            }
            if(bmi >= 25 && bmi < 29.9) {
                return "Overweight";
            }
            if(bmi >= 30) {
                return "Obesity";
            }
        }
    }

    triggerNext() {
        this.setState({ trigger: true }, () => {
          this.props.triggerNextStep();
          this.calculateBMI();
          this.getBMI();
        });
    }
  
    render() {
      const { name, gender, age, height, weight, bmi, bmiClass } = this.state;
      return (
        <div style={{ width: '100%' }}>
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{name.value}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{height.value}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{weight.value}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>BMI Value</p>
            <p>{bmi}</p>
            <p>BMI Class</p>
            <p>{bmiClass}</p>
          </div>
        </div>
      );
    }
}
  
  Review.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  Review.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };

class Vroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 0,
      height: 0
    };
  }

  componentDidMount() {
    this.calculateBMI = this.calculateBMI.bind(this);
    this.getBMI = this.getBMI.bind(this);
  }

  calculateBMI() {
    let bmiValue = ( this.state.weight / this.state.height) / this.state.height;
    this.setState({ bmi : bmiValue });
    let bmiClass = this.getBMI(bmiValue);
    this.setState({ bmiClass : bmiClass });
    console.log(this.state.bmi, bmiClass)
 }

 getBMI(bmi) {
    if(bmi < 18.5) {
        return "Underweight";
    }
    if(bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
    }
    if(bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    }
    if(bmi >= 30) {
        return "Obesity";
    }
 }

  render() {
    // all available config props
    const config ={
        width: "400px",
        height: "500px",
        floating: true,
    };

    return (
      <div className="container">
        {/* <header className="jumbotron">
        </header> */}
        <div className='mainHeader'>
            <h3>Virtual Fitting Room</h3>
        </div>
        <div className='mainContainer'>
            <div className='component-div'>
                <div className=''>
                    <div>
                        <img src='./images/vroom/bmi-women-2.jpg' alt='BMI image' />
                        <p></p>
                    </div>
                </div>
            </div>
            <div>
            <ChatBot
                handleEnd = {this.calculateBMI}
                steps={[
                {
                    id: '1',
                    message: 'Welcome to Size Advisor @ Fortry.',
                    trigger: '2',
                },
                {
                    id: '2',
                    message: 'Dear, please enter your name.',
                    trigger: 'name',
                },
                {
                    id: 'name',
                    user: true,
                    trigger: '4',
                },
                {
                    id: '4',
                    message: 'Hi {previousValue}! What is your gender?',
                    trigger: 'gender',
                },
                {
                    id: 'gender',
                    options: [
                    { value: 'male', label: 'Male', trigger: '6' },
                    { value: 'female', label: 'Female', trigger: '6' },
                    ],
                },
                {
                    id: '6',
                    message: 'How old are you?',
                    trigger: 'age',
                },
                {
                    id: 'age',
                    user: true,
                    trigger: '8',
                    validator: (value) => {
                    if (isNaN(value)) {
                        return 'value must be a number';
                    } else if (value < 0) {
                        return 'value must be positive';
                    } else if (value > 120) {
                        return `${value}? Come on!`;
                    }

                    return true;
                    },
                },
                {
                    id: '8',
                    message: 'Please enter your height in cm.',
                    trigger: 'height',
                },
                {
                    id: 'height',
                    user: true,
                    trigger: '10',
                    validator: (value) => {
                    if (isNaN(value)) {
                        return 'value must be a number';
                    } else if (value < 0) {
                        return 'value must be positive';
                    } else if (value > 220) {
                        return `${value}? Come on!`;
                    }

                    return true;
                    },
                },
                {
                    id: '10',
                    message: 'Please enter your weight in kg.',
                    trigger: 'weight',
                },
                {
                    id: 'weight',
                    user: true,
                    trigger: '12',
                    validator: (value) => {
                    if (isNaN(value)) {
                        return 'value must be a number';
                    } else if (value < 0) {
                        return 'value must be positive';
                    } else if (value > 200) {
                        return `${value}? Come on!`;
                    }

                    return true;
                    },
                },
                {
                    id: '12',
                    component: (
                      <div> 
                          <button onClick={() => this.calculateBMI()}>
                            Submit
                          </button> 
                      </div>
                    ),
                },
                {
                    id: '13',
                    message: 'Great! Check out your summary',
                    trigger: 'review',
                },
                {
                    id: 'review',
                    component: <Review />,
                    asMessage: true,
                    trigger: 'update',
                },
                {
                    id: 'update',
                    message: 'Would you like to update some field?',
                    trigger: 'update-question',
                },
                {
                    id: 'update-question',
                    options: [
                    { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                    { value: 'no', label: 'No', trigger: 'end-message' },
                    ],
                },
                {
                    id: 'update-yes',
                    message: 'What field would you like to update?',
                    trigger: 'update-fields',
                },
                {
                    id: 'update-fields',
                    options: [
                    { value: 'name', label: 'Name', trigger: 'update-name' },
                    { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                    { value: 'age', label: 'Age', trigger: 'update-age' },
                    { value: 'height', label: 'Height', trigger: 'update-height' },
                    { value: 'weight', label: 'Weight', trigger: 'update-weight' },
                    ],
                },
                {
                    id: 'update-name',
                    update: 'name',
                    trigger: '12',
                },
                {
                    id: 'update-gender',
                    update: 'gender',
                    trigger: '12',
                },
                {
                    id: 'update-age',
                    update: 'age',
                    trigger: '12',
                },
                {
                    id: 'update-height',
                    update: 'height',
                    trigger: '12',
                },
                {
                    id: 'update-weight',
                    update: 'weight',
                    trigger: '12',
                },
                {
                    id: 'end-message',
                    message: 'Thanks! Your data was submitted successfully!',
                    end: true,
                },
                ]}
                {...config}
            />
            </div>
        </div>
      </div>
    );
  }
}

export default Vroom;
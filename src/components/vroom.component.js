import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/layouts.css';
import '../css/component.css';

import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot/dist/react-simple-chatbot';

class Review extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: ''
      };
    }

    
  
    componentWillMount() {       
        const { steps } = this.props;
        const { name, gender, age, height, weight } = steps;
    
        this.setState({ name, gender, age, height, weight });
    }
  
    render() {
      const { name, gender, age, height, weight } = this.state;
      const calculateBMI = weight.value / (Math.pow((height.value * 0.01), 2));
      
      function getBMI(calculateBMI) {
        if(calculateBMI < 18.5) {
            return "Awesome! you are UNDERWEIGHT and your ideal size are S.";
        }
        if(calculateBMI >= 18.5 && calculateBMI < 24.9) {
            return "Excellent! You have a Normal Weight and you are free to take a S or M size of apparel.";
        }
        if(calculateBMI >= 25 && calculateBMI < 29.9) {
            return "Hey, you are abit OVERWEIGHT recently, but no worries you are still available for apparel with L size.";
        }
        if(calculateBMI >= 30) {
            return "OMG! you are categorized as OBESITY now, please take care of your health. FORTRY is still here with you, apparel with XL size is offer to you.";
        }
    }

      return (
        <div style={{ width: '100%' }}>
          <h4 className='text-white'>Summary</h4>
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
            <p>Your BMI value is {calculateBMI.toFixed(1)}</p>
            <p>{getBMI(calculateBMI)}</p>
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

  render() {
    // all available config props
    const config ={
        width: "400px",
        height: "500px",
        floating: true,
    };

    return (
      <div className="">
        <header className="jumbotron">
            <h3><b>VIRTUAL FITTING ROOM</b></h3>
        </header>
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
                steps={[
                {
                    id: '1',
                    message: "Hi, Welcome to Fortry Chatbot. I'm your Size Advisor and I'm here to help you calculate your BMI and the most ideal apparel size for you.",
                    trigger: '2',
                },
                {
                    id: '2',
                    message: 'Dear, how can I call you.',
                    trigger: 'name',
                },
                {
                    id: 'name',
                    user: true,
                    trigger: '4',
                },
                {
                    id: '4',
                    message: 'Alright {previousValue}! I will need some information to be able to do the calculations.',
                    trigger: '5',
                },
                {
                    id: '5',
                    message: 'What is your gender?',
                    trigger: 'gender',
                },
                {
                    id: 'gender',
                    options: [
                    { value: 'male', label: 'Male', trigger: '7' },
                    { value: 'female', label: 'Female', trigger: '7' },
                    ],
                },
                {
                    id: '7',
                    message: 'Cool, what is your height in centimeters (cm)?',
                    trigger: 'height',
                },
                {
                    id: 'height',
                    user: true,
                    trigger: '9',
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
                    id: '9',
                    message: 'And enter your weight in kg please.',
                    trigger: 'weight',
                },
                {
                    id: 'weight',
                    user: true,
                    trigger: '11',
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
                    id: '11',
                    message: 'Okay, just a little while away. How old are you?',
                    trigger: 'age',
                },
                {
                    id: 'age',
                    user: true,
                    trigger: '12',
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
                    id: '12',
                    message: 'Perfect, I have everything I need to calculate here.',
                    trigger: '13',
                },
                {
                    id: '13',
                    message: 'But first a very important information, the result I will show you are just averages obtained through formulas, so you should not take it literally. The most important are still your favor.',
                    trigger: '14',
                },
                {
                    id: '14',
                    message: "Great! While I was talking to you I've already done the calculations and you can check out your result here...",
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
                    message: 'Well, this is the information I can give you so far. Hope I really helped you. :)',
                    trigger: 'thank-message',
                },
                {
                    id: 'thank-message',
                    message: 'Thank you so much for using FORTRY Size Advisor!',
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
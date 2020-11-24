import React, { Component } from 'react'
import {Questions1} from './Questions'
import './Quiz.css'
var Questions=[];
let arr=[];

while(Questions.length<6){
    let i=Math.floor(Math.random()*10%10)
    if (!arr.includes(i)){
        arr[arr.length]=i
        Questions[Questions.length]=Questions1[i]
    }
}
console.log(Questions)

export class Quiz extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             question:"",
             userAnswer:null,
             currentIndex:0,
             options:[],
             score:0,
             quizEnd:false,
             disabled:true,
             storedData:[],
             fifty:false,
             changeQuestion:false
        }
    }
    
    loadQuiz=()=>{
        const {currentIndex}=this.state;
        this.setState(()=>{
            return {
                question:Questions[currentIndex].Country,
                options:Questions[currentIndex].Options,
                answer:Questions[currentIndex].Capital
            }
        } )
    }

        //Handles Click event for the next button
    nextQuestionHander = () => {
        const {userAnswer, answer, score,storedData} = this.state
        this.setState({
            storedData: [].concat(storedData,[userAnswer]),
            currentIndex: this.state.currentIndex + 1
            

        
        })
    //Check for correct answer and increment score
        if(userAnswer === answer){
            this.setState({
                score: score + 1
            })
        }
        
    }
   
    //Load the quiz once the component mounts
    componentDidMount(){
        this.loadQuiz();
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled:false
        })
    }
    //Update the component
    componentDidUpdate(prevProps, prevState){
        const{currentIndex} = this.state;
        if(this.state.currentIndex !== prevState.currentIndex){
            this.setState(() => {
                return {
                    disabled: true,
                    question: Questions[currentIndex].Country,
                    options : Questions[currentIndex].Options,
                    answer: Questions[currentIndex].Capital 
                           
                }
            });

        }
       

    }
    //Responds to the click of the finish button
    finishHandler =() => {
        const {userAnswer,storedData, answer, score} = this.state
        if(userAnswer === answer){
            this.setState({
            storedData: [].concat(storedData,[userAnswer]),
            score: score + 1
            })
        }
        if(this.state.currentIndex === Questions.length -2){
            this.setState({
                quizEnd:true
            })
        }

    } 
    checkFifty=()=>{
        const {currentIndex,fifty}= this.state;
        let i=Math.floor(Math.random()*10%4)
        while (!fifty){
            if(!fifty && (Questions[currentIndex].Options[i])!== (Questions[currentIndex].Capital)){
                this.setState({
                    options:[Questions[currentIndex].Options[i],Questions[currentIndex].Capital],
                    fifty:true
                })
                return
            }
            else
                i=Math.floor(Math.random()*10%4)
        }
    }
    changeQuestio=()=>{
        const {currentIndex,changeQuestion}= this.state;
        if(!changeQuestion){
            let a=currentIndex;
            [Questions[currentIndex],Questions[Questions.length-1]]=[Questions[Questions.length-1],Questions[currentIndex]]
            
            this.setState({changeQuestion:true,currentIndex:a})
            this.loadQuiz()
        }

    }
    

    

    render() {
        const {question,userAnswer,currentIndex,score,options,storedData,fifty, quizEnd,disabled,}= this.state;

        if(quizEnd){
            
            return(
                <div className='container'>
                    <h1>Game Over, The Final Score is {score} </h1>
                    <h3>
                        The Correct Answers For The Quiz Are :
                    </h3>
                    <ul>
                        {
                            Questions.slice(0,Questions.length-1).map((item,index) => (

                                <li className={` 'options' ${item.Capital===storedData[index]?'true':'false' } `}key={index}>
                                    {item.Country} {"  :   "} {item.Capital}
                                </li>

                            )
                            )
                        }
                    </ul>

                </div>
            )
        }



        return (
            <div className="container">
                
               <h3>{question} </h3>
                <span>{`Question ${currentIndex+1} of ${Questions.length-1} `}</span>
                { 
                    options.map(option=>
                        <p className={`options ${ userAnswer === option ?'selected':null } `}
                         onClick={()=>this.checkAnswer(option) } >
                           {option}
                        </p>
                    )
                    
                    }
                
                
                <button disabled={fifty} onClick={this.checkFifty}>50/50</button>


                { currentIndex < Questions.length-2 &&
                
                <button disabled={disabled} onClick={this.nextQuestionHander}>
                    Next Question
                </button>
                
                }
                { currentIndex === Questions.length-2 &&
                
                <button disabled={disabled} onClick={ this.finishHandler }>
                    Finish
                </button>
                
                
                }
                <button disabled={this.state.changeQuestion} onClick={this.changeQuestio}>Change question</button>
                



        </div>
           
        )
    }
}

export default Quiz

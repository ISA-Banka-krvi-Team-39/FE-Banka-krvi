import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Container from "../../shared-components/container/Container";
import { Answer } from "../../shared-components/model/questionnaire/Answer";
import { Question } from "../../shared-components/model/questionnaire/Question";
import { QuestionnaireClass } from "../../shared-components/model/questionnaire/QuestionnaireClass";
import { UserInfo } from "../../shared-components/model/shared/UserInfo";
import { getDataFromToken } from "../../shared-components/navbar/getToken";

export default function Questionnaire() {
    const [questions,setQuestions] = useState([Question]);
    const [answers,setAnswers] = useState([] as Answer[]);
    const router = useRouter();
    function sendQuestionnaire(){
      var token = localStorage.getItem("auth")
      const tokenNotNull = token != null ? token : "";
      const config = {
          headers: {
          'Access-Control-Allow-Origin' : '*',
          'Authorization': `Bearer ${token}`
          }
      }
        var userInfo:UserInfo = getDataFromToken(tokenNotNull);
        axios.post("http://localhost:8080/api/questionnaire/save", new QuestionnaireClass(userInfo.id,answers),config).then(res => {
            router.push("/");
        })
        .catch(err => {
            toast.error('Oops! Something went wrong!', {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }
    var tokenNotNull = ""
    var config = {};
    if (typeof window !== 'undefined') {
        var token = localStorage.getItem("auth")
        tokenNotNull = token != null ? token : "";
        config = {
            headers:{
            'Access-Control-Allow-Origin' : '*',
            'Authorization': `Bearer ${token}`
            }
        }
      }
    if(questions.length == 1){
    axios.get("http://localhost:8080/api/questionnaire/questions",config)
    .then(res => {
        setQuestions(res.data);
        var answersList = [] as Answer[];
        (res.data as Question[]).forEach((question) => {
            answersList.push(new Answer(false,question.questionId,question.question))
            })
        setAnswers(answersList);
    })
    .catch(err => { console.log(err)})
    return <div className="text text-4xl text-center my-80">Loading</div>;
    }
  return (
    <Container className="mt-12">
      <h1 className="text-5xl text-center mb-12 text font-bold">Questionnaire</h1>
      {answers.map((answer,index) =>{
        return <div key={index} className="text my-6 text-2xl flex border-b-2 pb-6 border-emerald-700 justify-between">
          <span><span className="font-bold">Question {" "}{index + 1}:</span> {" "}{answer.question}</span>
          <input type="checkbox" className="w-8 h-8 accent-emerald-600 items-end mr-6 "onChange={(event)=>{
            answer.answer = !answer.answer;
          }}></input>
        </div>
      })}
    <div className="flex justify-center mb-16 mt-16">
      <button className="text-emerald-200 bg-emerald-900 rounded-[48px] px-12 py-6 font-medium text-4xl" onClick={sendQuestionnaire}>
        Send questionnaire
      </button>
    </div>
    <ToastContainer theme="dark" />
    </Container>
  )
}

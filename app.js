let systemResult =0;
let totalScore =0;
let scoreDiv = document.getElementById('score');
let totalAttempts = 0;
let attemptsDiv = document.getElementById('attempts');
let totalCorrect =0 ;
let correctDiv = document.getElementById('correct');
let totalWrong =0;
let wrongDiv = document.getElementById('wrong');
let btn = document.getElementById('btn');
let resultBtn =document.getElementById('resultBtn');
let problems = [];
let answer = document.getElementById('answer');
let problem = document.getElementById('problem');
let operators = ['+','-','*','/'];
let tryA = document.querySelector('#tryA') ;
let tryVar = false;



function SystemCalc(num1, num2, operators, operatorIndex){
    if(operators[operatorIndex] == '+'){
        systemResult = num1+num2;
    }
    else if(operators[operatorIndex] == '-'){
        systemResult = num1-num2;
    }
    else if(operators[operatorIndex] == '*'){
        systemResult = num1*num2;
    }
    else if(operators[operatorIndex] == '/'){
        systemResult = Math.floor(num1/num2);
    }
    else{
        alert('Something went wrong!');
    }
}

function randomProblem(){
    let random1 = Math.floor(Math.random()*10);
    let random2 = Math.floor(Math.random()*10);
    let operatorIndex = Math.floor(Math.random()*operators.length);
    if((random1>random2)&&(operators[operatorIndex]=='/')){
        let num = random1;
        random1 = random2;
        random2 = num;
    }

    let problemStatement = random1 + ' '+ operators[operatorIndex] + ' '+random2;
    problems.push(random1);
    problems.push(random2);
    problems.push(operatorIndex);


    problem.innerText = problemStatement;
    SystemCalc(random1, random2, operators, operatorIndex);
}

function correctAns(){
    resultBtn.innerText='Correct Answer 🥳';
    let success = document.getElementById('success');
    success.play();

    resultBtn.classList.add('border');
    resultBtn.classList.add('bg-lime-100');
    resultBtn.classList.add('border-lime-200');
    resultBtn.classList.add('text-lime-800');
    resultBtn.classList.add('transition','ease-in-out');

    setTimeout(()=>{
        resultBtn.classList.remove('border');
        resultBtn.classList.remove('bg-lime-100');
        resultBtn.classList.remove('border-lime-200');
        resultBtn.classList.remove('text-lime-800');
        resultBtn.classList.remove('transition','ease-in-out');
        resultBtn.innerText='';
    }, 3000)
}

function wrongAns(){
    resultBtn.innerText='Wrong Answer 🙁';
    let failure = document.getElementById('failure');
    failure.play();
    tryA.innerText='Try Again';

    resultBtn.classList.add('border');
    resultBtn.classList.add('bg-red-100');
    resultBtn.classList.add('border-red-200');
    resultBtn.classList.add('text-red-800');
    tryA.classList.add('border');
    tryA.classList.add('bg-red-100');
    tryA.classList.add('border-red-200');


    setTimeout(()=>{
        resultBtn.classList.remove('border');
        resultBtn.classList.remove('bg-red-100');
        resultBtn.classList.remove('border-red-200');
        resultBtn.classList.remove('text-red-800');
        tryA.classList.remove('bg-red-100');
        tryA.classList.remove('border');
        tryA.classList.remove('border-red-200');
        resultBtn.innerText='';
        tryA.innerText='';
    }, 3000)

}

tryA.addEventListener('click',()=>{
    let numb1 = problems[0];
    let numb2 = problems[1];
    let oprt = problems[2];
    tryVar = true;

    let problemStatement =numb1 + ' '+ operators[oprt]+' '+numb2;

    problem.innerText = problemStatement;
    console.log(problemStatement);
    SystemCalc(numb1, numb2, operators, oprt);

})

function submit(){
    totalAttempts = totalAttempts+1;
    attemptsDiv.innerText=totalAttempts;
    if(systemResult == answer.value){
        totalCorrect = totalCorrect+1;
        correctDiv.innerText = totalCorrect;
        correctAns();
    }
    else{
        totalWrong = totalWrong +1;
        wrongDiv.innerText =totalWrong;
        wrongAns();
    }
    scoreDiv.innerText = totalCorrect - totalWrong;
    setTimeout(()=>{
        answer.value='';
        if(tryVar == false){
            randomProblem();
            problems.pop();
            problems.pop();
            problems.pop();
        }else{
            tryVar = false;
        }
        
    },3000)
}

randomProblem();

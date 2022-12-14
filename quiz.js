'use strict'

const data = [
   {
      id: 1,
      question: "Which of these fish is actually a fish?",
      answers: [
         { answer: "swordfish", isCorrect: true },
         { answer: "jellyfish", isCorrect: false },
         { answer: "starfish", isCorrect: false },
         { answer: "crayfish", isCorrect: false },
      ],
   },
   {
      id: 2,
      question: "A flutter is a group of:",
      answers: [
         { answer: "bees", isCorrect: false },
         { answer: "penguins", isCorrect: false },
         { answer: "butterflies", isCorrect: true },
         { answer: "camels", isCorrect: false },
      ],
   },
   {
      id: 3,
      question: "A group of which animals is referred to as a wake?",
      answers: [
         { answer: "bats", isCorrect: false },
         { answer: "vultures", isCorrect: true },
         { answer: "ants", isCorrect: false },
      ],
   },
];

// 1. Написати функцію, яка показуватиме відповіді та поточне питання.
//  В рамках цієї функції зробити перевірку на останнє питання і якщо перевірка проходить, то показувати результат.

//   Приклад розмітки однієї відповіді:
//   <div class="answer">
//     <input type="radio" id=${index} name="answer" value=${isCorrect} />
//     <label for=${index}>{answer}</label>
//   </div>


// 2. Написати функцію, яка вішатиме обробники подій click на всі відповіді. І записувати значення в змінну selectedAnswer


// 3. Написати функцію onSubmit, яка вішатиме обробник подій на кнопку Submit.
// Перевірити чи вибрана відповідь. Якщо вибрано, тоді зробити перевірку на правильну відповідь, інкрементувати correctCount або wrongCount.
// І також інкрементувати індекс наступного питання


// 4. Написати функцію showResult, яка показуватиме блок із результатом та записуватиме значення
// По прикладу
// `Correct Answers: ${correctCount}`;
// `Wrong Answers: ${wrongCount}`;
// `Score: ${(correctCount - wrongCount) * 10}`;


// 5. Написати функцію resetResult, яка скидатиме наступні значення
// questionIndex, correctCount, wrongCount

// 6. Повісити обробник подій на кнопку Play again, яка має показувати блок із питаннями, приховати блок із результом, скинути всі значення в 0, а також показувати перше питання.





let indexQuestion = 0;
let selectedAnswer = null;
let correctCount = 0;
let wrongCount = 0;

const question = document.querySelector('.question');
const answersCont = document.querySelector('.answers');
const submitBtn = document.querySelector('.submit');
const gameView = document.querySelector('.game');
const resultView = document.querySelector('.result');
const playBtn = document.querySelector('.play');

const selectedAnswers = () => {

   const answersAll = document.querySelectorAll('input').forEach(element => {
      element.addEventListener('click', (e) => {
         selectedAnswer = e.target.value;
      })
   })
}
const showQuestion = (index) => {
   if (index === data.length) showResult();
   else {
      question.textContent = data[index].question;
      const answers = data[index].answers.map((item, index) =>
         `
           <div class="answer">
             <input type="radio" id=${index} name="answer" value=${item.isCorrect} />
             <label for=${index}>${item.answer}</label>
           </div>
            `).join('');

      answersCont.innerHTML = answers;

      selectedAnswers();
   }
}

const onSubmit = () => {
   submitBtn.addEventListener('click', () => {
      if (selectedAnswer !== null) {
         selectedAnswer === 'true' ? correctCount++ : wrongCount++;
         indexQuestion++;
         showQuestion(indexQuestion);
      } else {
         alert('Choose an answer')
      }
   })
}

const correctAnsw = resultView.querySelector('.correct');
const wrongAnsw = resultView.querySelector('.wrong');
const scoreResult = resultView.querySelector('.score')

const showResult = () => {
   gameView.style.display = 'none';
   resultView.style.display = 'block';
   correctAnsw.textContent = `Correct Answers: ${correctCount}`;
   wrongAnsw.textContent = `Correct Answers: ${wrongCount}`;
   scoreResult.textContent = `Score: ${(correctCount / wrongCount) * 100}`
}

const resetResult = () => {
   indexQuestion = 0;
   correctCount = 0;
   wrongCount = 0;
}

playBtn.addEventListener('click', () => {
   gameView.style.display = 'block';
   resultView.style.display = 'none';
   resetResult();
   showQuestion(indexQuestion)
})

onSubmit();
showQuestion(indexQuestion);




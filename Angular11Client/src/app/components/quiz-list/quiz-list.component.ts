import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent implements OnInit {
  quizes?: Quiz[];
  currentQuiz?: Quiz;
  currentIndex = -1;
  title = '';

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.retrieveQuizes();
  }

  retrieveQuizes(): void {
    this.quizService.getAll()
      .subscribe(
        data => {
          this.quizes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveQuizes();
    this.currentQuiz = undefined;
    this.currentIndex = -1;
  }

  setActiveQuiz(quiz: Quiz, index: number): void {
    this.currentQuiz = quiz;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.quizService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.quizService.findByTitle(this.title)
      .subscribe(
        data => {
          this.quizes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}

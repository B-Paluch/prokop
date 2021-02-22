import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { QuizService } from '../services/quiz.service';
import { Quiz } from 'src/app/models/quiz.model';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  currentQuiz?:Quiz;
  message = '';
  isLoggedIn = false;
  username?: string;
  constructor(
    private tokenStorageService: TokenStorageService,
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getQuiz(this.route.snapshot.params.id);
  }

  getQuiz(id: string): void {
    this.quizService.get(id)
      .subscribe(
        data => {
          this.currentQuiz = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

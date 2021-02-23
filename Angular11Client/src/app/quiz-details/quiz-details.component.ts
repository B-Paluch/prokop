import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Quiz, Questions } from 'src/app/models/quiz.model';
import {ActivatedRoute} from "@angular/router";
const url = '../../';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  currentQuiz:Quiz = {};
  currentQuestion:Questions = {};
  message = '';
  isLoggedIn = false;
  username?: string;
  currentIndex = -1;
  title = '';
  answers? : String[] = [];
  wrongs?: String[] = [];
  selected?: String[] = [];
  points:number=0;
  max?:number;
  checked=false;
  constructor(
    private tokenStorageService: TokenStorageService,
    private quizService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.points=0;
    this.getQuiz(this.route.snapshot.params.id);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.max=Questions.length;

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
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

  setActiveQuestion(question: Questions, index: number): void {
    this.currentQuestion = question;
    this.currentIndex = index;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  wrongAnswer(item:string):boolean{
    return (this.wrongs?.includes(item))||false;
  }

  rightAnswer(item:string):boolean{
    return (this.answers?.includes(item))||false;
  }

  selectedAnswer(item:string):boolean{
    return (this.selected?.includes(item))||false;
  }

  mark(): void {
    var $markedCheckbox = document.querySelectorAll('input:checked');
    var checked = ['zaznaczone odpowiedzi'];
    $markedCheckbox?.forEach(function (value,index) {
      checked.push(value.id);
    });
    console.log(checked);
    var $questions = this.currentQuiz.questions;
    var $qwnumber = ['numery nieprawidlowych'];
    var $qpnumber = ['numery prawidlowych'];
    var $ranswer : String[] = ['trafione'];
    var $wanswer : String[] = ['chybione'];
    var $nanswer = ['niezaznaczone'];
    var $npoint = [-1];
    $questions?.forEach(function (question,Qindex) {
      question?.alternatives?.forEach(function (option,Oindex) {
        if(option.isCorrect)
        $qpnumber.push(Qindex+'.'+Oindex);
        else $qwnumber.push(Qindex+'.'+Oindex);
        }
      );
    });
    for (let i=1;i<checked.length;i++){
      if($qpnumber.includes(checked[i])){
        $ranswer.push(checked[i]);
        console.log(typeof($qpnumber));
      }
      if($qwnumber.includes(checked[i])){
        $wanswer.push(checked[i]);
        console.log(typeof($qpnumber));
      }
    }
    for(let i=1;i<$qpnumber.length;i++){
      if(!(checked.includes($qpnumber[i]))){
        $nanswer.push($qpnumber[i]);
      }
    }
    for(let i =0;i<($questions?.length||0); i++){
      $wanswer.forEach(function (val){
        if(+val[0]==i){
          $npoint.push(i);
        }
      });
      $nanswer.forEach(function (val){
        if(+val[0]==i){
          $npoint.push(i);
        }
      });
    }
    for(let i = 0;i<($questions?.length||0); i++){
      if(!($npoint.includes(i))){
        this.points++;
      }
    }
    console.log($wanswer);
    this.answers = $qpnumber;
    this.wrongs = $wanswer;
    this.selected = checked;
    this.checked=true;
    this.max = $questions?.length||0;
  }
}

import {Component, OnInit} from '@angular/core';
import {DataService} from '../../bo/data.service';
import {Router} from '@angular/router';
import {Question} from '../../bo/interfaces';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  public currentQuestion: number;
  private question: Array<Question>;
  public copiedQuestion: Array<Question>;
  public score: number;

  constructor(private  dataService: DataService,
              private route: Router,
              public toastController: ToastController,
              public alertController: AlertController) {
  }

  ngOnInit() {
    this.question = this.dataService.currentQuiz.questions;
    const copy = [...this.question].filter(q => q.a1 !== '');
    this.currentQuestion = 0;
    this.score = 0;
    this.copiedQuestion = this.shuffle(copy);
    if (this.copiedQuestion.length === 0) {
      this.route.navigateByUrl('/');
    }
  }

  // not real random
  shuffle(array): Array<Question> {
    return array.sort(() => Math.random() - 0.5);
  }

  checkAnswer(answer: number) {
    if (answer === this.copiedQuestion[this.currentQuestion].correct) {
      this.score++;
      this.currentQuestion++;
      this.answerShow('Right answer');
      if (this.quizEnd()) {
        this.currentQuestion = 0;
        this.quizFinished();
      }
    } else {
      this.score--;
      this.currentQuestion++;
      this.answerShow('Wrong answer');
      if (this.quizEnd()) {
        this.currentQuestion = 0;
        this.quizFinished();
      }
    }
  }

  quizEnd(): boolean {
    return this.currentQuestion === this.copiedQuestion.length;
  }

  async answerShow(answer) {
    const toast = await this.toastController.create({
      message: answer,
      duration: 2000
    });
    toast.present();
  }


  async quizFinished() {
    const alert = await this.alertController.create({
      header: 'Great! You finished the Quiz!',
      message: 'You scored ' + this.score + ' points',
      buttons: [
        {
          text: 'Back',
          handler: () => {
            this.route.navigate(['home']);
          }
        }
      ]
    });

    await alert.present();
  }
}

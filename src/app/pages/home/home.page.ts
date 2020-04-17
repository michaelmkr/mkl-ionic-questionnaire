import {Component} from '@angular/core';
import {DataService} from '../../bo/data.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public output: string;

    constructor(private data: DataService, private router: Router) {
        this.output = this.data.getText();
    }

  public showList() {
      this.router.navigateByUrl('/question-list');
  }
  public showQuizList() {
      this.router.navigateByUrl('/quiz-list');
  }

    public startQuiz() {
        this.router.navigateByUrl('/quiz');
    }

}

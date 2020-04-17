import {Component, OnInit} from '@angular/core';
import {DataService} from '../../bo/data.service';
import {Quiz} from '../../bo/interfaces';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.page.html',
    styleUrls: ['./quiz-list.page.scss'],
})
export class QuizListPage implements OnInit {

    constructor(public data: DataService, private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    load(quiz: Quiz) {
        this.data.currentQuiz = quiz;
        this.data.save();
        this.navCtrl.navigateBack('/');
    }

    // TODO delete function
    deleteQuiz(quiz: Quiz) {
        this.data.currentQuiz = quiz;
        this.data.save();
        this.navCtrl.navigateBack('/');
    }

}

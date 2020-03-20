import {Injectable} from '@angular/core';
import {Quiz} from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() {
        this.currentQuiz.questions.push({
            id: '1',
            title: 'How much equals 2+2?',
            a1: '1',
            a2: '2',
            a3: '3',
            a4: '4',
            correct: 4
        });
    }

    public currentQuiz: Quiz = {
        id: '',
        quizName: 'Quiz Number 1',
        questions: []
    };

    public getText(): string {
        return 'This is our super awesome text from data.service.ts';
    }
}

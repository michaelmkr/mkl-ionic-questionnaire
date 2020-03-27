import {Injectable} from '@angular/core';
import {Question, Quiz} from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() {
        this.currentQuiz.questions.push({
            id: '1',
            title: 'How much equals 1+2?',
            a1: '1',
            a2: '2',
            a3: '3',
            a4: '4',
            correct: 3
        });
        this.currentQuiz.questions.push({
            id: '2',
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

    public getQuestion(id: string): Question {
        return this.currentQuiz.questions.find(q => q.id === id);
    }

    public deleteQuestion(q: Question) {
        const index = this.currentQuiz.questions.indexOf(q);
        if (index > -1) {
            this.currentQuiz.questions.splice(index);
        }
        this.save();
    }

    public newQuestion(): Question {
        return {
            id: '',
            title: '',
            a1: '',
            a2: '',
            a3: '',
            a4: '',
            correct: 1
        };
    }

    public load() {
    }

    public save() {
    }
}

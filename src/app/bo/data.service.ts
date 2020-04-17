import {Injectable} from '@angular/core';
import {Question, Quiz} from './interfaces';
import {v4 as uuidv4} from 'uuid';
import {Plugins} from '@capacitor/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

const {Storage} = Plugins;


@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private db: AngularFirestore) {
        this.load();
        this.currentQuiz.questions.push({
            id: uuidv4(),
            title: 'Initial Question Fallback if Storage empty',
            a1: '',
            a2: '',
            a3: '',
            a4: '',
            correct: 1
        });

        this.quizObservable = this.db.collection('quizzes').valueChanges() as unknown as Observable<Quiz[]>;
        this.quizObservable.subscribe((data: Quiz[]) => {
            console.log(data);
        }) ;
    }

    public quizObservable: Observable<Quiz[]>;

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

    public addQuestion(q: Question) {
        q.id = uuidv4();
        this.currentQuiz.questions.push(q);
        this.save();
    }

    public async load() { // Grischa mag keine Promises mit .then
        try {
            const res = await Storage.get({key: 'myQuestions'});
            if (res.value) {
                this.currentQuiz = JSON.parse(res.value);
            } else {
                console.log('res.value does not exist');
            }
        } catch (error) {
            console.log(error);
        }
    }

    public save() {
        Storage.set({
            key: 'myQuestions',
            value: JSON.stringify(this.currentQuiz),
        });
    }

    public saveQuizToFirebase() {
        if (this.currentQuiz.id === '') {
            this.currentQuiz.id = this.db.createId();
        }
        this.db.collection('quizzes').doc(this.currentQuiz.id).set(this.currentQuiz);
    }

    public createQuiz() {
        this.currentQuiz = {
            id: '',
                quizName: '',
            questions: []
        };
    }
}

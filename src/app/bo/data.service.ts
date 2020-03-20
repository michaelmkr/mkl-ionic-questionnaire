import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() {


    }

    public getText(): string {
        return 'This is our super awesome text from data.service.ts';
    }
}

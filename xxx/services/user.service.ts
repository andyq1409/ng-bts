import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor() {
        this.user = {
            id: '123',
            username: 'janek',
            firstName: 'Jan',
            lastName: 'Kowalski',
            email: 'jan.kowalski@poczta.pl',
            roles: []
        };
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}

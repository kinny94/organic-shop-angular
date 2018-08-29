import { AppUser } from './../app/models/app-model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class UserService {

	constructor( private db: AngularFireDatabase ) { }

	save( user: firebase.User ){
		this.db.object( '/users/' + user.uid ).update({
			name: user.displayName,
			email: user.email
		})
	}

	objectReference: AngularFireObject<any>;

	get( uid ) : AngularFireObject<AppUser>{
		return this.db.object( '/users/' + uid );
	}
}

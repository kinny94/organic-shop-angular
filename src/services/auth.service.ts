import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../app/models/app-model';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	user$: Observable<firebase.User>;

	constructor( private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute ) {
		this.user$ = afAuth.authState;
	}

	login(){
		let returnUrl = this.route.snapshot.queryParamMap.get( 'returnUrl' ) || '/';
		localStorage.setItem( 'returnUrl', returnUrl );

		this.afAuth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider());
	}

	logout(){
		this.afAuth.auth.signOut();
	}

	//Observable that returns Appuser object
	get appUser$() : Observable<AppUser>{
		return this.user$.pipe( switchMap ( data => {
			return this.userService.get( data.uid ).valueChanges()
		}));
	}


}

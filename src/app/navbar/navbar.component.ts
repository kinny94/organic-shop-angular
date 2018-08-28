import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

	user: firebase.User;

	constructor( private afAuth: AngularFireAuth) {
		afAuth.authState.subscribe( user => this.user = user );
	}

	logout(){
		this.afAuth.auth.signOut();
	}

}

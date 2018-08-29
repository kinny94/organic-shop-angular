import { AppUser } from './../models/app-model';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

	appUser: AppUser;

	constructor( private auth: AuthService) {
		auth.appUser$.subscribe( appUser => {
			return this.appUser = appUser
		});
	}

	logout(){
		this.auth.logout();
	}

}

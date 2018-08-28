import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

	constructor( public auth: AuthService) {}

	logout(){
		this.auth.logout();
	}

}

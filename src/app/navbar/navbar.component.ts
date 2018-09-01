import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { AppUser } from './../models/app-model';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

	appUser: AppUser;
	items$;

	async getCartItems(){
		let cartId = await this.cartService.getOrCreateCartId();
		let quantityRef = await firebase.database().ref(  '/cart/' + cartId + '/items/');
		return new Promise(( resolve, reject ) => {
			return quantityRef.on('value', ( data ) => {
				let totalitems = 0;
				let firebaseObj = data.val();
				for( let key in firebaseObj ){
					totalitems += firebaseObj[key]["product"]["quantity"];
				}
				this.items$ = totalitems;
				resolve( totalitems );
			});
		});
	}

	constructor( private auth: AuthService, private router: Router, private cartService: CartService ) {
		this.getCartItems().then( data =>  data );
		auth.appUser$.subscribe( appUser => {
			return this.appUser = appUser
		});
	}

	logout(){
		this.auth.logout();
		this.router.navigate(['/']);
	}

}

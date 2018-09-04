import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent{

	cart$;
	totalPrice$: number = 0;

	constructor( private cart: CartService, private router: Router) {
		this.getCartData().then( data => data );
	}

	async getCartData() {

		let cartId = await this.cart.getOrCreateCartId();
		let cart = await firebase.database().ref(  '/cart/' + cartId + '/items/');
		cart.on( 'value', (snapshot) => {
			let items = snapshot.val();
			this.cart$ = [];
			for( let key in items ){
				this.cart$.push( items[key ]);
				this.totalPrice$ += parseFloat( items[key]["product"]["price"] ) *  parseFloat( items[key]["product"]["quantity"] );
			}
		});
	}

	removeFromCart( product ){
		this.cart$ = [];
		this.totalPrice$ = 0;
		this.cart.removeFromCart( product );
	}

	addToCart( product ){
		this.cart$ = [];
		this.totalPrice$ = 0;
		this.cart.addToCart( product );
	}

	removeAll( product ){
		this.cart$ = [];
		this.totalPrice$ = 0;
		this.cart.removeAllSameProductFromCart( product );
	}

	isNumber(val) { return Array.isArray( val ); }

	async goToCheckout(){
		let cartId = await this.cart.getOrCreateCartId();
		this.router.navigate(['/checkout', { cartId }]);
	}
}

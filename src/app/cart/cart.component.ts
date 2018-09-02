import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent{

	cart$ = [];
	totalPrice$: number = 0;

	constructor( private cart: CartService) {
		this.getCartData().then( data => data );
	}

	async getCartData() {

		if( this.cart$.length > 0 ){
			for( let i=0; i<this.cart$.length; i++ ){
				let item  = this.cart$[i];
				for(let key in this.cart$[i]){
					if( item[key]["product"]["quantity"] === 0 ){
						this.cart$.splice( i, 1 );
					}
				}
			}
		}

		let cartId = await this.cart.getOrCreateCartId();
		let cart = await firebase.database().ref(  '/cart/' + cartId + '/items/');
		cart.on( 'value', (snapshot) => {
			let items = snapshot.val();
			for( let key in items ){
				this.cart$.push( items[key ]);
				this.totalPrice$ += parseFloat( items[key]["product"]["price"] ) *  parseFloat( items[key]["product"]["quantity"] );
			}
		});
	}

	removeFromCart( product ){
		this.cart$ = [];
		this.cart.removeFromCart( product );
	}

	addToCart( product ){
		this.cart$ = [];
		this.cart.addToCart( product );
	}
}

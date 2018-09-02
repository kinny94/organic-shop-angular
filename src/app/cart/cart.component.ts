import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	cart$ = [];
	totalPrice$: number = 0;

	constructor( private cart: CartService) { }

	async ngOnInit() {

		if( this.cart$.length > 0 ){
			for( let i=0; i<this.cart$.length; i++ ){
				let item  = this.cart$[i];
				for(let key in this.cart$[i]){
					console.log( item[key]["product"]["quantity"] );
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
		this.cart.removeFromCart( product );
	}

	addToCart( product ){
		this.cart.addToCart( product );
	}
}

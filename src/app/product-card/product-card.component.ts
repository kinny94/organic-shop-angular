import { CartService } from './../../services/cart.service';
import { Component, Input } from '@angular/core';
import { Product } from '../products/products.component';
import * as firebase from 'firebase';

@Component({
	selector: 'product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

	@Input('product') product: Product;
	@Input('show-actions') showActions = true;

	quantity$;

	async getCartItems(){
		let cartId = await this.cartService.getOrCreateCartId();
		let quantityRef = await firebase.database().ref(  '/cart/' + cartId + '/items/' + this.product.id + "/product/quantity" );
		return new Promise((resolve, reject) => {
			return quantityRef.on('value', ( snapshot ) => {

				if( snapshot.val() !== null){
					this.quantity$ = snapshot.val();
				}else{
					this.quantity$ = 0;
				}
				resolve(snapshot.val());
			});
		});
	}

	constructor( private cartService: CartService ) {
		this.getCartItems().then( data =>  data );
	}

	addToCart( product: Product ){
		this.cartService.addToCart( product );
	}
}

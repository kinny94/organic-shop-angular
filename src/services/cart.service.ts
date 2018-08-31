import { map, take } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from '../app/admin/admin-products/admin-products.component';
import { ProductService } from './product.service';
import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	items$;
	constructor( private db: AngularFireDatabase, private productService: ProductService ) { }

	private create(){
		return this.db.list('/cart').push({
			dateCreated: new Date().getTime()
		});
	}

	private getCart( cartId: string ){
		return this.db.object('/cart' + cartId ).valueChanges();
	}

	private async getOrCreateCartId(){
		let cartId = localStorage.getItem('cartId');

		if( !cartId ){

			let result = await this.create();
			localStorage.setItem('cartId', result.key );
			return result.key
		}

		return cartId;
	}

	async addToCart( product: Product){
		let cartId = await this.getOrCreateCartId();
		let item;
		this.productService.getProduct( product.id ).pipe( map( result => {
			return result;
		})).subscribe( data => {
			let ref = firebase.database().ref(  '/cart/' + cartId + '/items/');
			ref.child( product.id ).once( 'value', ( snapshot ) => {
				if( snapshot.exists() ){
					let quantityRef = firebase.database().ref(  '/cart/' + cartId + '/items/' + product.id + "/product/quantity" );
					quantityRef.transaction(( currentQuanitity ) => {
						return ( currentQuanitity || 0 ) + 1;
					})
				}else{
					let newProduct = firebase.database().ref(  '/cart/' + cartId + '/items/' + product.id );
					product["quantity"] = 1;
					newProduct.set({ product });
				}
			});
		});
	}
}



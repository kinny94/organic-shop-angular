import { CartService } from './../../services/cart.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';


@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	@Input('cart$') cart$;

	shipping:any =  {};
	firstname;
	lastname;
	address;
	city;
	state;
	zip;
	cartId;

	constructor( private activatedRoute: ActivatedRoute, private router: Router, private cartService: CartService ) {
		this.activatedRoute.params.subscribe(( params: Params ) => {
			this.cartId = params.cartId;
		});
	}

	async save( data ){
		let cartId = await this.cartService.getOrCreateCartId();
		let currentUser = firebase.auth().currentUser.email;
		let products = [];

		firebase.database().ref('/cart/' + cartId + "/items/").on('value', (snapshot) => {
			let items = snapshot.val();
			for( let item in items ){
				let date =  new Date().getDate();
				let month = new Date().getMonth();
				let year = new Date().getFullYear();
				let time = new Date().getTime();

				let fullDate = month + "/" + date + "/" + year + " @ " + time;
				items[item].product["date"] = fullDate;
				let product = items[item].product
				products.push( product );
			}
		});

		let userRef = firebase.database().ref('/users/');
		userRef.once('value', ( snapshot ) => {
			let users = snapshot.val();
			for( let user in users ){
				if( users[user].email === currentUser ){

					firebase.database().ref('/users/' + user + "/orders/" ).push( products );
					firebase.database().ref('/cart/' + cartId ).remove();
					this.router.navigate(['/my/orders']);
				}
			}
		})

	}

	ngOnInit() {
		this.shipping = new FormGroup({
			firstname: new FormControl("", Validators.required ),
			lastname: new FormControl("", Validators.required ),
			address: new FormControl("", Validators.required ),
			city: new FormControl("", Validators.required ),
			state: new FormControl("", Validators.required ),
			zip: new FormControl("", Validators.required )
		});
	}

}

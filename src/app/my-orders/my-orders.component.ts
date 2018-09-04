import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
	selector: 'app-my-orders',
	templateUrl: './my-orders.component.html',
	styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent{

	orders$;
	constructor() {
		let currentUser = firebase.auth().currentUser.email;
		firebase.database().ref('/users/').on( 'value', (snapshot) => {
			let users = snapshot.val();
			for( let user in users ){
				if( users[user].email === currentUser ){
					firebase.database().ref('/users/' + user + "/orders/").on('value', (snapshot) => {
						this.orders$ = [];
						let orders = snapshot.val();
						for( let order in orders ){
							this.orders$.push( orders[order ]);
						}
					});
				}
			}
		});
	}
}

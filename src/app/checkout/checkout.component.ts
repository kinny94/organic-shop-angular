import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	shipping:any =  {};
	firstname;
	lastname;
	address;
	city;
	state;
	zip;

	constructor() { }

	save( data ){
		if( data ){
			alert("ORder Placed!");
		}
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

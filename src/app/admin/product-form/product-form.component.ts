import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

	constructor() { }

	emailFormControl = new FormControl('', [

		Validators.required,
		Validators.email,
	]);

}

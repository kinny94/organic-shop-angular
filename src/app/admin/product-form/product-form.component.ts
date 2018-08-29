import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

	categories$;
	constructor( categoryService: CategoryService, private productService: ProductService ) {
		this.categories$ = categoryService.getCategories().valueChanges();
	}

	emailFormControl = new FormControl('', [
		Validators.required
	]);

	save( product ){
		this.productService.create( product );
	}
}

import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent{

	categories$;
	constructor( private categoryService: CategoryService, private productService: ProductService, private router: Router ) {
		this.categories$ = categoryService.getCategories().valueChanges();
	}

	emailFormControl = new FormControl('', [
		Validators.required
	]);

	save( product ){
		this.productService.create( product );
		this.router.navigate([ '/admin/products' ]);
	}
}

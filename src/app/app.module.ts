import { CategoryService } from './../services/category.service';
import { AdminAuthGuardService } from './../services/admin-auth-guard.service';
import { UserService } from './../services/user.service';
import { AuthGuardService } from './../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ng2-validation';
import {DataTableModule} from "angular-6-datatable";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

import '../polyfills';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
	MatAutocompleteModule,
	MatBadgeModule,
	MatBottomSheetModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatTreeModule, } from '@angular/material';
import { ProductService } from '../services/product.service';

	@NgModule({
		exports: [
			CdkTableModule,
			CdkTreeModule,
			MatAutocompleteModule,
			MatBadgeModule,
			MatBottomSheetModule,
			MatButtonModule,
			MatButtonToggleModule,
			MatCardModule,
			MatCheckboxModule,
			MatChipsModule,
			MatStepperModule,
			MatDatepickerModule,
			MatDialogModule,
			MatDividerModule,
			MatExpansionModule,
			MatGridListModule,
			MatIconModule,
			MatInputModule,
			MatListModule,
			MatMenuModule,
			MatNativeDateModule,
			MatPaginatorModule,
			MatProgressBarModule,
			MatProgressSpinnerModule,
			MatRadioModule,
			MatRippleModule,
			MatSelectModule,
			MatSidenavModule,
			MatSliderModule,
			MatSlideToggleModule,
			MatSnackBarModule,
			MatSortModule,
			MatTableModule,
			MatTabsModule,
			MatToolbarModule,
			MatTooltipModule,
			MatTreeModule,
		]
	})
	export class DemoMaterialModule {}


	@NgModule({
		declarations: [
			AppComponent,
			NavbarComponent,
			HomeComponent,
			ProductsComponent,
			CartComponent,
			CheckoutComponent,
			OrderSuccessComponent,
			MyOrdersComponent,
			AdminProductsComponent,
			AdminOrdersComponent,
			LoginComponent,
			ProductFormComponent,
		],
		imports: [
			BrowserModule,
			BrowserAnimationsModule,
			DemoMaterialModule,
			FormsModule,
			ReactiveFormsModule,
			CustomFormsModule,
			DataTableModule,
			AngularFireModule.initializeApp( environment.firebase ),
			AngularFireAuthModule,
			AngularFireDatabaseModule,
			NgbModule.forRoot(),
			RouterModule.forRoot([
				{	path: '',	component: ProductsComponent },
				{	path: 'products',	component: ProductsComponent},
				{	path: 'cart',	component: CartComponent },
				{	path: 'login',	component: LoginComponent },

				{	path: 'checkout',	component: CheckoutComponent, canActivate: [ AuthGuardService ] },
				{	path: 'order-success',	component: OrderSuccessComponent, canActivate: [ AuthGuardService ] },
				{	path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthGuardService ] },

				{
					path: 'admin/orders',
					component: AdminOrdersComponent,
					canActivate: [ AuthGuardService , AdminAuthGuardService ]
				},
				{ 	path: 'admin/products/new',
					component: ProductFormComponent,
					canActivate: [ AuthGuardService, AdminAuthGuardService 	]
				},
				{ 	path: 'admin/products/:id',
					component: ProductFormComponent,
					canActivate: [ AuthGuardService, AdminAuthGuardService 	]
				},
				{
					path: 'admin/products',
					component: AdminProductsComponent,
					canActivate: [ AuthGuardService, AdminAuthGuardService ]
				},
			])
		],
		providers: [
			AuthService,
			AuthGuardService,
			UserService,
			CategoryService,
			AdminAuthGuardService,
			ProductService
		],
		bootstrap: [AppComponent]
	})
	export class AppModule { }

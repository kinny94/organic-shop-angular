import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
		LoginComponent
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp( environment.firebase ),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		NgbModule.forRoot(),
		RouterModule.forRoot([
			{	path: '',	component: HomeComponent },
			{	path: 'products',	component: ProductsComponent},
			{	path: 'cart',	component: CartComponent },
			{	path: 'checkout',	component: CheckoutComponent },
			{	path: 'order-success',	component: OrderSuccessComponent },
			{	path: 'login',	component: LoginComponent },
			{	path: 'my/orders', component: MyOrdersComponent },
			{	path: 'admin/products', component: AdminProductsComponent },
			{	path: 'admin/orders',	component: AdminOrdersComponent }
		])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

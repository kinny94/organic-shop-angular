import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp( environment.firebase ),
		AngularFireAuthModule,
		AngularFireDatabaseModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
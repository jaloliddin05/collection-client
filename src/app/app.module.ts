import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { CollectionModule } from './modules/collection/collection.module';
import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { TagModule } from './modules/tag/tag.module';
import { FieldModule } from './modules/field/field.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AdminModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    CollectionModule,
    FieldModule,
    HomeModule,
    HttpClientModule,
    ItemModule,
    SharedModule,
    TagModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

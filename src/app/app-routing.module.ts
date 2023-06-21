import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './modules/home/home.component';
import { CollectionComponent } from './modules/collection/collection-single/collection.component';
import { ItemComponent } from './modules/item/item-single/item.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { CollectionListComponent } from './modules/collection/collection-list/collection-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'collection', component: CollectionListComponent },
      { path: 'collection/:id', component: CollectionComponent },
      { path: 'collection/:cId/item/:id', component: ItemComponent },
    ],
  },
  {
    path: 'profile/:userId',
    component: UserProfileComponent,
    children: [
      { path: 'collection', component: CollectionListComponent },
      { path: 'collection/:id', component: CollectionComponent },
      { path: 'collection/:cId/item/:id', component: ItemComponent },
    ],
  },
  { path: 'collection/:id', component: CollectionComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'header', component: HeaderComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

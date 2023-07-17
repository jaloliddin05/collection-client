import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './modules/home/home.component';
import { CollectionComponent } from './modules/collection/collection-single/collection.component';
import { ItemComponent } from './modules/item/item-single/item.component';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { CollectionListComponent } from './modules/collection/collection-list/collection-list.component';
import { UserListComponent } from './modules/user/user-list/user-list.component';
import { UserSingleComponent } from './modules/user/user-single/user-single.component';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { HomeCollectionComponent } from './modules/home/home-collection/home-collection.component';
import { UserCollectionComponent } from './modules/collection/user-collection/user-collection.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'collection', component: HomeCollectionComponent },
      { path: 'collection/:id', component: CollectionComponent },
      { path: 'item/:id', component: ItemComponent },
      { path: 'collection/:cId/item/:id', component: ItemComponent },
    ],
  },
  {
    path: 'profile/:userId',
    component: UserProfileComponent,
    children: [
      { path: 'collection', component: UserCollectionComponent },
      { path: 'collection/:id', component: CollectionComponent },
      { path: 'collection/:cId/item/:id', component: ItemComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'users/:id/collection', component: UserSingleComponent },
      { path: 'users/:userId/collection/:id', component: CollectionComponent },
      {
        path: 'users/:userId/collection/:cId/item/:id',
        component: ItemComponent,
      },
    ],
  },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: 'home/collection' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

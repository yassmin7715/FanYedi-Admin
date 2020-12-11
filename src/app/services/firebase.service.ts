import { Injectable } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection}from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from'firebase/app';
import { Observable } from 'rxjs';
//import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  _db:AngularFirestore;
users:  Observable<any[]>;
  isLoggedIn =false 
  constructor(public firebaseAuth:AngularFireAuth,public afs:AngularFirestore, private router: Router) {
    this.users = afs.collection('users').valueChanges();
    this._db = afs;   
  }
  /*getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/users').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }*/
  getUsers(){
    return this.users;
    this._db;
  }
  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res =>{
      this.isLoggedIn =true 
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  /*async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res =>{
      this.isLoggedIn =true 
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }*/
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
    this.router.navigate([''])
  }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.firebaseAuth.signInWithPopup(provider)
      .then( res=>{
        resolve(res);
        this.router.navigate(['/home'])
      })
    })
  }
  
}

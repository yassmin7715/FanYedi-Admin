import { Component, OnInit } from '@angular/core';
export interface User{UserEmail: String;UserName: String;UserNumber:String}
import {AngularFirestore}from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-list-artisans',
  templateUrl: './list-artisans.component.html',
  styleUrls: ['./list-artisans.component.css']
})
export class ListArtisansComponent implements OnInit {
  _db:AngularFirestore;
users:  Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.users = db.collection('User').valueChanges();
  this._db = db; }

  ngOnInit(): void {
  }

}

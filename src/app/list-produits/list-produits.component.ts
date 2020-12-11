import { Component, OnInit } from '@angular/core';
export interface Produit{name: String;recipe:String;userId:String};
import {AngularFirestore}from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.css']
})
export class ListProduitsComponent implements OnInit {
  _db:AngularFirestore;
  products:  Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.products = db.collection('colrecipes').valueChanges();
  this._db = db;
   }

  ngOnInit(): void {
  }

}

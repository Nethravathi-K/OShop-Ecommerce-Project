import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}
  getCategories(){
    // return this.db.list('/categories',ref => ref.orderByChild('name')).valueChanges();

    return this.db.list('/categories').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({key: a.key, ...a.payload.val()}))
     )
    );
  }
}

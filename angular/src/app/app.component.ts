import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OfficeWorks } from './officeworks.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projectdettol';

  products;

  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.firestore.collection('officeworks').snapshotChanges()
      .subscribe(data => {
        console.log(data);
        this.products = data.map(e => {
          return {
            sku: e.payload.doc.id,
            data: e.payload.doc.data()
          } as OfficeWorks;
        });
      });
  }
}

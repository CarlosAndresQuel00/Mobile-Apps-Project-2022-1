import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marker } from '../home/home.page';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {
  orderForm: FormGroup;

  data: Marker = {
    position: {
      lat: null,
      lng: null,
    },
    title: '',
    id: ''
  };

  constructor(private angularFirestore: AngularFirestore, private interaction: InteractionService,
              private formBuilder: FormBuilder) {
                this.orderForm = formBuilder.group({
                  first:['', Validators.required],
                  second:['', Validators.required],
                  third:['', Validators.required]
                });
              }

  ngOnInit() {
  }

  createMarker() {
    this.interaction.showLoading('Guardando...');
    const id = this.getId();
    this.data.id = id;
    const collection = this.angularFirestore.collection('markers');
    return collection.doc(id).set(this.data).then(() => {
      this.interaction.endLoading();
      this.interaction.presentToast('Guardado con éxito');
      this.orderForm.reset();
    });
  }

  getId() {
    return this.angularFirestore.createId();
  }

}

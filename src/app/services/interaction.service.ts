import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: any;

  constructor(public toastController: ToastController, private loadingCtrl: LoadingController) { }

  async presentToast(messages: string) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000
    });
    toast.present();
  }

  async showLoading(messages: string) {
    this.loading = await this.loadingCtrl.create({
      message: messages,
      cssClass: 'custom-loading'
    });
    this.loading.present();
  }

  async endLoading() {
    this.loading.dismiss();
  }
}

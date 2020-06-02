import { Component } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };
 
  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private localNotifications: LocalNotifications
  ) {
 
    this.backgroundGeolocation.configure(this.config).then((location: BackgroundGeolocationResponse) => {
 
        console.log(location);
        this.showNotification(location)
        // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
        // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
        // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        this.backgroundGeolocation.finish(); // FOR IOS ONLY
 
      });
  }
 
  startBackgroundGeolocation() {
    // start recording location
    this.backgroundGeolocation.start();
  }
 
  stopBackgroundGeolocation() {
    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
  }
 
  showNotification(data){
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: JSON.stringify(data),
      sound: 'file://sound.mp3',
      data: { secret: "key" }
    });
  }
}

import { Component } from '@angular/core';
import { AppService } from './app.service';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: any;
  public visible: boolean;
  constructor(private socketService:SocketService, private myService: AppService) {
    this.updateFromServer();
    // Polling Method ------------------------ 
    // setInterval(() => {
    //   this.checkName();
    // }, 2000);
  }

  // checkName() {
  //   this.myService.getname().subscribe((data) => {
  //     this.title = data.nameVal;
  //     this.visible = data.showVal;
  //     console.log(data);
  //   });
  // }
  // Polling Method end ------------------------
  
  updateFromServer() {
    this.socketService.initConnection();
    this.socketService.getDataFromServer().subscribe((data) =>{
      this.title = data.name;
      this.visible = data.showVal;
      console.log(data);
    })
  }
}

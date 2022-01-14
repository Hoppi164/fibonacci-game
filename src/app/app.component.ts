import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fibonacci-game';

  counter:number = 0
  timerRef:any;
  isRunning:boolean = false;
  
  toggleTimer() {
    this.isRunning = !this.isRunning;
    const startTime = Date.now() - (this.counter || 0);

    if(this.isRunning){
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });   
    }
    else{
      clearInterval(this.timerRef)
    }
  }

  timeTaken(){
    let mins = Math.floor( (this.counter / 60000) )
    let secs = Math.round( (this.counter / 1000) % 60 )
    return `Minutes: ${ mins }\nSeconds: ${secs}`
  }
}

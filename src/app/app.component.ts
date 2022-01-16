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
  allSelectedNumbers:any = {};
  
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

  selectNumber(currentValue:string){
    let currentNum = parseInt(currentValue)
    if(currentNum<=0){
      alert("Only positive numbers are allowed in this method")
      return
    };
    
    if(this.allSelectedNumbers[currentValue]){
      this.allSelectedNumbers[currentValue] += 1;
    }
    else{
      this.allSelectedNumbers[currentValue] = 1;
    }
    if( this.isFibonacci(currentNum) && this.findIndex(currentNum) <= 1000 ){
      alert('FIB')
    }
  }
  

  // PLESE READ:
  // 
  // Initially i thought to use a recursive function to pre-caluclate the first 1000 numbers of fibonacci
  // and use a object-lookup to determine if the input is a fibonacci number
  // i quickly realised this would be too compute intensive and needed a better solution
  // i discovered this "binet's formula" online which can quickly determine if a number is a fibonacci sequence
  // and another formula to determine which index a given number is wihtin the fibonnaci sequence 
  // 
  // I make no claim to fully understand the inner workings of these mathematic formula's.
  // I have applied them here, and tested them, and they appear to work correctly
  // Note: these formulas were sourced from a trusted website, and scientific paper.
  // 
  // http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibFormula.html#isfibcalc
  // https://www.geeksforgeeks.org/check-number-fibonacci-number/
  // https://www.geeksforgeeks.org/find-index-given-fibonacci-number-constant-time/
  // 

  // A utility function that returns true if x is perfect square
  isPerfectSquare(n:number)
  {
    let squaredRoot = Math.sqrt(n);
    return Math.pow( Math.round(squaredRoot),2 )==n
  }

  // This function returns true if n is a Fibonacci Number, else false
  isFibonacci(n:number)
  {
      // n is Fibinacci if one of 5*n*n + 4 or 5*n*n - 4 or both is a perfect square
      return  this.isPerfectSquare(5*n*n+4) || this.isPerfectSquare(5*n*n-4);
  }

  findIndex(n:number)
  {
      var fibo = 2.078087 * Math.log(n) + 1.672276;

      // Returning rounded off value of index
      return Math.round(fibo);
  }

}

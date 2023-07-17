import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from './shared/behavior.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Grow and Help Frontend';

  constructor(private router:Router,
    private _bs:BehaviorService){
    this.router.events.subscribe((event: any) => {
  
  
      // console.log("event", event.url)
    
      // if(event.url){
      //   let url = event.url.split('?')
      //   if(url[0] && url[0] == "/search"){
      //     this.isSearchPage = true;
      //   } else{
      //     this.isSearchPage = false;
      //   }
      // }
    
      this._bs.closeModal();
      _bs.load(false);
      window.scroll(0, 0);
    });
    
  }
  
}



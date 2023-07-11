import { Component, OnInit } from '@angular/core';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user:any;
  _host:any = environment.apiUrl;
  bsRef:any
  constructor(private _bs:BehaviorService) {
   this.bsRef=this._bs.getUserData().subscribe((res: any) => {
      if(res){
        this.user = res
      } else{
        this.user = _bs.getLocalUser()
      }
    });
  }

  ngOnInit(): void {
  }

  userImg(img:any){
    let value = './assets/img/profile.jpg';

    if(img && img.includes('https://')){
      value = img;
    }
    else if(img){
      value = this._host+'images/users/'+img
    }

    return value;
  }

  logout(){
    this._bs.signOut()
  }

  ngOnDestroy(): void {
    // this.bsRef.unsubscribe()
  }

  toggle(){
    let el=document.getElementById('mainPannel')
    let el2=document.getElementById('mainHeader')
    if(el && el2){
      el.classList.toggle('isFull')
      el2.classList.toggle('isFull')
    } 
  }

}

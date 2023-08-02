import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AuthService } from 'src/app/utils/services/auth.service';
import { FrontendService } from 'src/app/utils/services/frontend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
 
})
export class HeaderComponent implements OnInit {
  isAccessToken!: boolean;
  id: any
  public user: any;
  // isLoggedIn : Observable<boolean>;
  // user:any;
  _host: any = environment.apiUrl;
  bsRef: any
  constructor(private _bs: BehaviorService, private authService: AuthService, private router: Router,) {

    this._bs.getUserData().subscribe((res: any) => {
 
      if (res) {
        this.user = res
      } else {
        this.user = _bs.getLocalUser()
      }
    });


  }

  ngOnInit(): void {
    
    this.id = localStorage.getItem("id")
    if (this.id) {
      this.isAccessToken = true
    } else if (!this.id){
      this.isAccessToken = false 
    }
    // this.authService.currentUserSource.subscribe((res) => {
    //   if (res == true) {
    //     this.isAccessToken = true
    //   } else {
    //     this.isAccessToken = false
    //   }

    // })
    // this.getUserData()
  //   this.authService.getuserdata().subscribe({
  //     next: (res: any) => {
  //       console.log(res)
  //     }
  //   })
  
  }
  // getUserData() {
  //   this._bs.load(true)
  //   this.frontendService.viewProfile().subscribe({
  //     next: (res: any) => {
  //       this._bs.load(false)
  //       this.user = res.data
  //       console.log(this.user)

  //     },

  //   })
  // }
  userImg(img: any) {
    let value = './assets/img/profile.jpg';

    if (img && img.includes('https://')) {
      value = img;
    }
    else if (img) {
      value = this._host + 'images/users/' + img
    }

    return value;
  }

  logout() {
    // this._bs.signOut()
    // this.authService.signOut()
    // this.authService.currentUserSource.next(false)
    this._bs.signOut()
  }

  logIn() {
    this.router.navigateByUrl('/auth/login')
  }

  ngOnDestroy(): void {
    // this.bsRef.unsubscribe()
  }

  toggle() {
    let el = document.getElementById('mainPannel')
    let el2 = document.getElementById('mainHeader')
    if (el && el2) {
      el.classList.toggle('isFull')
      el2.classList.toggle('isFull')
    }
  }

}

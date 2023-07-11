import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private _bs:BehaviorService,
    private router:Router
  ) {
    if(_bs.getLocalUser()){
      router.navigateByUrl('/')
    }
  }

  ngOnInit(): void {
  }

}

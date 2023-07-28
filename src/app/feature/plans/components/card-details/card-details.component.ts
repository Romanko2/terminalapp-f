import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontendService } from 'src/app/utils/services/frontend.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  cardForm: FormGroup;
  user_id:any;
  card_id:any;
  id:any;
  constructor(private fb: FormBuilder , private fs:FrontendService , private _activatedroute:ActivatedRoute , private toastr:ToastrService) {
    this.cardForm = this.fb.group({
      card_number: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      exp_month: ['', Validators.required],
      exp_year: ['', Validators.required],
      cvc: ['', Validators.required]
    })

    this.id = this._activatedroute.snapshot.params['id']
    console.log(this.id)
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id')
  }
  
  submitcard(){
    alert("hello")
    this.fs.addCard(this.cardForm.value).subscribe({
      next:(res)=>{
        this.card_id = res.data.default_source
        console.log(res , "res")
        if(res){
          this.purchasePlan()
        }
       
      },
      error:(err)=>{
        this.toastr.error(err)
      }
    })
  }

  purchasePlan(){
    const body = {
      user_id:this.user_id,
      card_id:this.card_id,
      id:this.id
    }
    this.fs.purchasePlan(body).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastr.success(res.message)
      }
    })
  }
}

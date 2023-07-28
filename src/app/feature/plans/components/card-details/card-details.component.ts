import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontendService } from 'src/app/utils/services/frontend.service';
import { LocalStorageService } from 'src/app/utils/services/local-storage.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  cardForm: FormGroup;
  cardType = new FormControl('')
  cardsList: any[] = []
  user_id: any;
  card_id: any;
  id: any;
  submitted: any;
  selectedMonth!: string;
  selectedDate!: number;

  dates: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  years: number[] = [];
  constructor(private fb: FormBuilder, private ls:LocalStorageService ,private fs: FrontendService, private _activatedroute: ActivatedRoute, private toastr: ToastrService , private router:Router) {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 100;

    for (let year = currentYear; year <= endYear; year++) {
      this.years.push(year);
    }
    this.cardForm = this.fb.group({
      card_number: ['', [
        Validators.required,
        Validators.minLength(12)
      ]],
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
    this.getCards()
    this.cardType.valueChanges.subscribe((res) => {
      console.log(res)
    })
  }

  submitcard() {
    if (this.cardForm.valid) {
      this.fs.addCard(this.cardForm.value).subscribe({
        next: (res) => {
          this.card_id = res.data.default_source
          console.log(res, "res")
          if (res) {
            this.purchasePlan()
            
          }
         
        },
        error: (err) => {
          // this.toastr.error(err)
        }
      })
    } else {
      this.cardForm.markAllAsTouched()
    }
  }

  getCards() {
    this.fs.getCards().subscribe({
      next: (res) => {
        this.cardsList = res.data
        
      }
    })
  }

  purchasePlan() {
    const body = {
      user_id: this.user_id,
      card_id: this.card_id,
      id: this.id
    }
    this.fs.purchasePlan(body).subscribe({
      next: (res) => {
        console.log(res)
        this.toastr.success(res.message)
        this.cardForm.reset();
        this.submitted = false
        this.router.navigate(['/feature/plans'])
        let isPurchased:boolean = true
        this.ls.saveData("isPurchased" , isPurchased)
        this.fs.isPurchased$.next(isPurchased)
      }
    })
  }



  get f() { return this.cardForm.controls; }

  months: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

}

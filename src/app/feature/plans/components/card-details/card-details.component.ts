import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorService } from 'src/app/shared/behavior.service';
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
  cardId:any;
  id: any;
  submitted: any;
  selectedPlan:any;
  selectedMonth!: string;
  selectedDate!: number;
  selectedPlanprice:number=0
public cardloader:boolean= false;
  dates: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  years: number[] = [];
  selectedCard: any;
  constructor(private fb: FormBuilder, private ls:LocalStorageService ,private fs: FrontendService, private _activatedroute: ActivatedRoute, private toastr: ToastrService , private router:Router , private bs:BehaviorService) {
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
    this.getPlanDetail()
  }

  submitcard() {
    this.submitted = true
    if (this.cardForm.valid) {
      this.bs.load(true)
      this.fs.addCard(this.cardForm.value).subscribe({
        next: (res) => {
         
          this.card_id = res.data.default_source
          console.log(res, "res")
          this.bs.load(false)
          this.getCards()
          this.cloaseModal()
          this.cardForm.reset()
          this.submitted = false
          // if (res) {
          //   this.purchasePlan()
            
          // }
          this.toastr.success(res.message)
         
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
    this.bs.load(true)
    this.fs.getCards().subscribe({
      next: (res) => {
        this.cardsList = res.data
        
        this.bs.load(false)
      }
    })
  }

  purchasePlan() {
    const body = {
      user_id: this.user_id,
      card_id: this.card_id,
      id: this.id
    }
    if(this.selectedPlanprice){
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
        },
      })
    }else{
      this.toastr.error("Please select payment")
    }
   
  }
  cloaseModal(){
    document.getElementById('closeModal')?.click()
    this.submitted = false;
  }


  markDefault(index:any){
    this.cardloader=true
    this.selectedCard=this.cardsList[index]
    this.card_id = this.cardsList[index].card_id
    this.cardloader = false
    // let data={
    //   id:this.cards[index].id
    // }
    // this.appService.update(data, 'card/set-primary').subscribe((res:any) => {
    //   if (res.success) {
    //     this.getCards()
    //   } else {
    //     $event.stopPropagation();
    //   }
    //   setTimeout(() => {
    //     this.cardloader=false
    //   }, 500);
      
    // },error=>{
    //   this.cardloader=false
    //   $event.stopPropagation();
    //   return false
      
    // })
  }


  getPlanDetail(){
    this.fs.getPlanById(this.id).subscribe({
      next:(res:any)=>{
        this.selectedPlan = res.data
        this.selectedPlanprice=res.data.amount
      }
    })
  }


  delete(card_id:any){
    this.fs.deleteCards(card_id).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message)
        this.getCards()
      } 
    })
  }
  get f() { return this.cardForm.controls; }

  months: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { AuthService } from 'src/app/utils/services/auth.service';
import { FrontendService } from 'src/app/utils/services/frontend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 ngOnInit(): void {
   
 }
}

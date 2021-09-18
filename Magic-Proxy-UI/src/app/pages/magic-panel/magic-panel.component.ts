import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-magic-panel',
  templateUrl: './magic-panel.component.html',
  styleUrls: ['./magic-panel.component.css']
})
export class MagicPanelComponent implements OnInit {

  m_SectionNumber: number = 1;

  constructor(
    private session: SessionService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.session.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }
  }

  onSectionChange(index: number){
    this.m_SectionNumber = index;
  }

}

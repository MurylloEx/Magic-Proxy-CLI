import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'magic-users',
  templateUrl: './magic-users.component.html',
  styleUrls: ['./magic-users.component.css']
})
export class MagicUsersComponent implements OnInit {

  m_Users: any[] = [];
  m_SelectedUser: any;

  constructor() { }

  ngOnInit(): void {
  }

}

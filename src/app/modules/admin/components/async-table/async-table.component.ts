import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-async-table',
  templateUrl: './async-table.component.html',
  styleUrls: ['./async-table.component.css']
})
export class AsyncTableComponent implements OnInit {

  dataSource = new MatTableDataSource();

  constructor() { }

  ngOnInit(): void {
  }

}

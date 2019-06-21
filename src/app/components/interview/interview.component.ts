import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

  interviews?: [Survey];

  displayedColumns: string[] = ['id', 'name'];

  constructor(private interviewService: InterviewService) { }

  ngOnInit() {
    this.interviewService.getAll()
      .pipe(tap(resources => this.interviews = resources))
      .subscribe();
  }





}

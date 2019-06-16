import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  sessions: Session[];

  displayedColumns: string[] = ['id', 'surveyId', 'actions'];

  constructor(private sessionService: SessionService, private route: Router) { }

  ngOnInit() {
    this.sessionService.getAll()
      .pipe(tap(data => this.sessions = data))
      .subscribe();
  }

  edit(session: Session) {
    this.route.navigate(['/session', session.id]);
  }

}

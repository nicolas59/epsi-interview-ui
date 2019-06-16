import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute } from '@angular/router';
import { tap, switchMap, map, concatMap, concatAll } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { EtudiantService } from 'src/app/service/etudiant.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {

  private session: Session;

  private students = Array<Student>();

  displayedColumns: string[] = ['id', 'name', 'firstName', 'email'];

  constructor(private sessionService: SessionService, private etudiantService: EtudiantService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(map(params => params['sessionId'] as number),
        switchMap(sessionId => this.sessionService.findById(sessionId)),
        tap(session => this.session = session),
        switchMap(session => from(session.studentIds).pipe(
          map(studentId => this.etudiantService.findById(studentId.id)),
          concatAll(),
          tap(student => this.students = [...this.students, student]))
        ))
      .subscribe(() => console.log(arguments));
  }

}

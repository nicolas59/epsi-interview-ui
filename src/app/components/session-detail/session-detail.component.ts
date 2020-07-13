import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/services/session.service";
import { ActivatedRoute } from "@angular/router";
import { tap, switchMap, map, concatMap, concatAll } from "rxjs/operators";
import { of, from } from "rxjs";
import { EtudiantService } from "src/app/services/etudiant.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-session-detail",
  templateUrl: "./session-detail.component.html",
  styleUrls: ["./session-detail.component.css"],
})
export class SessionDetailComponent implements OnInit {
  session: Session;

  students = Array<Context>();

  displayedColumns: string[] = [
    "id",
    "name",
    "firstName",
    "email",
    "uuid",
    "statut",
    "score",
    "action",
  ];

  constructor(
    private toastr: ToastrService,
    private sessionService: SessionService,
    private etudiantService: EtudiantService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        map((params) => params["sessionId"] as number),
        switchMap((sessionId) => this.sessionService.findById(sessionId)),
        tap((session) => (this.session = session)),
        switchMap((session) =>
          from(session.studentIds).pipe(
            map((studentId) =>
              this.sessionService.getContext(session.id, studentId.id)
            ),
            concatAll(),
            tap((student) => (this.students = [...this.students, student]))
          )
        )
      )
      .subscribe();
  }

  sendEmail(student: Context) {
    this.sessionService.sendEmail(this.session, student).subscribe(
      () => this.toastr.success("Email envoyé"),
      (error) => this.toastr.error(error)
    );
  }

  sendEmailAll() {
    this.sessionService.sendEmailAll(this.session).subscribe(
      () => this.toastr.success("Emails envoyés"),
      (error) => this.toastr.error(error)
    );
  }

  getStatus(session: Session) {
    if (session.startedDate && session.endDate) {
      return "end";
    } else if (session.startedDate) {
      return "in_progress";
    } else {
      return "not_started";
    }
  }

  convertDate(date): Date {
    if (date) {
      return new Date(Date.parse(date.replace("[UTC]", "")));
    }
    return null;
  }
}

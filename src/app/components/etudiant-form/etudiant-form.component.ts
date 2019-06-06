import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from, of, pipe } from 'rxjs';
import { EtudiantService } from 'src/app/service/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {


  etudiantForm: FormGroup;

  promotionId?: number;

  constructor(private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.etudiantForm = fb.group({
      name: [''],
      firstName: [''],
      email: ['']
    });
  }

  ngOnInit() {
    this.activeRoute.params.pipe(
      map(param => param['promotion'] as number),
      tap(promotionId => this.promotionId = promotionId)
    ).subscribe(

    );
  }

  onSubmit() {
    const student = {
      name: this.etudiantForm.get('name').value,
      firstName: this.etudiantForm.get('firstName').value,
      email: this.etudiantForm.get('email').value,
      category: {
        id: this.promotionId
      }
    };

    this.etudiantService.save(student).subscribe(
      (success) => this.router.navigate(['/promotion-detail', this.promotionId])
    );

  }

}

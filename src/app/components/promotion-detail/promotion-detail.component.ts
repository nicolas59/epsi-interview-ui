import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, zip } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'firstName', 'email'];

  promotion?: Category;

  students?: [Student];

  constructor(private promotionService: PromotionService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.pipe(
      map(params => params['promotion'] as number),
      switchMap(promotionId => {
        const promotion = this.promotionService.findById(promotionId);
        const students = this.promotionService.findAllStudents(promotionId);
        return forkJoin(promotion, students);
      }))
      .subscribe(([categoy, students]) => {
        this.promotion = categoy;
        this.students = students;
      });
  }

  createNewStudent() {
    this.router.navigate(['/promotion', this.promotion.id, 'etudiant-form']);
  }

}

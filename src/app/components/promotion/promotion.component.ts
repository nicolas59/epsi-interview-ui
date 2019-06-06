import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotions?: [Category];

  displayedColumns: string[] = ['id', 'name'];

  constructor(private promotionService: PromotionService) { }

  ngOnInit() {
    this.promotionService.getAll().subscribe((data) => this.promotions = data);
  }



}

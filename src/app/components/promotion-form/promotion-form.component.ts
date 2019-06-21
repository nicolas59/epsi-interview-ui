import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionService } from 'src/app/services/promotion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.css']
})
export class PromotionFormComponent implements OnInit {

  promotionForm: FormGroup;

  constructor(private fb: FormBuilder, private promotionService: PromotionService, private router: Router) {
    this.promotionForm = fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    const cat = {
      name: this.promotionForm.get('name').value
    } as Category;
    this.promotionService.save(cat).subscribe(
      () => this.router.navigate(['/promotion'])
    );
  }

}

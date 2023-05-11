import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Pet } from 'src/app/interfaces/Pet';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-show-pet',
  templateUrl: './show-pet.component.html',
  styleUrls: ['./show-pet.component.css']
})
export class ShowPetComponent implements OnInit, OnDestroy {

  private id!: number;
  pet!: Pet;
  loading: boolean = false;

  routeSub!: Subscription;

  constructor(private _veterinaryService: VeterinaryService,
    private aRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSub = this.aRoute.params.subscribe({
      next: (v) => this.id = v['id'],
      error: (e) => console.log(e)
    });
    this.getPet();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getPet() {
    this._veterinaryService.getPet(this.id).subscribe({
      next: (v) => this.pet = v,
      error: (e) => {
        alert("Error loading data");
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/interfaces/Pet';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css']
})
export class AddEditPetComponent implements OnInit {

  loading: boolean = false;
  form: FormGroup;
  id: number;
  action: string = "Add";

  constructor(private fb: FormBuilder,
    private _veterinaryService: VeterinaryService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      breet: ['', Validators.required],
      color: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
    });

    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.action = "Edit"
      this.getPet(this.id);
    }
  }

  addEditPet() {

    const pet: Pet = {
      name: this.form.value.name,
      breet: this.form.value.breet,
      color: this.form.value.color,
      age: this.form.value.age,
      weight: this.form.value.weight
    };

    if (this.id != 0) {
      console.log("1");
      pet.id = this.id;
      this.editPet(this.id, pet);
    } else {
      console.log("2");
      pet.id = 0;
      this.addPet(pet);
    }

  }

  addPet(pet: Pet) {
    this._veterinaryService.addPet(pet).subscribe({
      next: (v) => {
        this.successMessage('added');
        this.router.navigate(['/petList']);
      },
      error: (e) => { console.log(e); },
      complete: () => {
        this.loading = false;
      }
    });
  }

  editPet(id: number, pet: Pet) {
    this._veterinaryService.updatePet(id, pet).subscribe({
      next: (v) => {
        this.successMessage('edited');
        this.router.navigate(['/petList']);
      },
      error: (e) => { console.log(e); },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getPet(id: number) {
    this.loading = true;

    this._veterinaryService.getPet(id).subscribe({
      next: (data) => {
        this.form.setValue({
          name: data.name,
          breet: data.breet,
          color: data.color,
          age: data.age,
          weight: data.weight,
        });
      },
      error: (e) => {

      }
    });

    this.loading = false;
  }

  successMessage(text: string) {
    this._snackBar.open(`Successfully  ${text}`, '', {
      duration: 3000
    });
  }
}

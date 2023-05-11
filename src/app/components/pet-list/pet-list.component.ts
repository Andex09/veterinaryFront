import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Pet } from 'src/app/interfaces/Pet';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'age', 'breet', 'color', 'weight', 'actions'];
  dataSource = new MatTableDataSource<Pet>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _veterinaryServie: VeterinaryService) { }

  ngOnInit(): void {
    this.getPets();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Page items';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPets() {
    this.loading = true;

    this._veterinaryServie.getPets().subscribe({
      next: (v) => {
        this.dataSource.data = v;
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        alert("Error loading data");
      }
    });

  }

  deletePet(id: number) {
    this.loading = true;

    this._veterinaryServie.deletePet(id).subscribe({
      error: (e) => console.log(e),
      complete: () => {
        this.successMessage()
        this.loading = false;
        this.getPets();
      }
    });
  }

  successMessage() {
    this._snackBar.open('Success', '', {
      duration: 3000
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psf',
  templateUrl: './psf.component.html',
  styleUrls: ['./psf.component.css']
})
export class PsfComponent implements OnInit {
  psfs: any[] = [];
  fetched: boolean = false;
  showAddPsfForm = false;
  showUpdatePsfForm = false;
  psfForm!: FormGroup;
  currentPsfId: number | null = null;
  private apiUrl = 'http://localhost:8000/api/psfs';

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getAllPsfs();
    this.psfForm = this.fb.group({
      name: ['', Validators.required],
      code: [0, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  getAllPsfs(): void {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(
        response => {
          this.psfs = response;
          this.fetched = true;
        },
        error => {
          console.error('Error fetching PSFs:', error);
          this.fetched = false;
        }
      );
  }

  toggleAddPsfForm(): void {
    this.showAddPsfForm = !this.showAddPsfForm;
    this.showUpdatePsfForm = false;
    this.psfForm.reset();
  }

  onAddPsf(): void {
    if (this.psfForm.valid) {
      this.http.post<any>('http://localhost:8000/api/psf', this.psfForm.value)
        .subscribe(
          response => {
            this.psfs.push(response);
            this.psfForm.reset();
            this.showAddPsfForm = false;
            console.log(response)
          },
          error => {
            console.error('Error adding PSF:', error);
          }
        );
    }
  }

  openUpdatePsfForm(psf: any): void {
    this.currentPsfId = psf.id;
    this.psfForm.setValue({
      name: psf.name,
      code: psf.code
    });
    this.showUpdatePsfForm = true;
    this.showAddPsfForm = false;
  }

  onUpdatePsf(): void {
    if (this.psfForm.valid && this.currentPsfId !== null) {
      this.http.put<any>(`${this.apiUrl}/${this.currentPsfId}`, this.psfForm.value)
        .subscribe(
          response => {
            const index = this.psfs.findIndex(p => p.id === this.currentPsfId);
            if (index !== -1) {
              this.psfs[index] = response;
            }
            this.psfForm.reset();
            this.showUpdatePsfForm = false;
            this.currentPsfId = null;
          },
          error => {
            console.error('Error updating PSF:', error);
          }
        );
    }
  }

  deletePsf(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(
        response => {
          this.psfs = this.psfs.filter(p => p.id !== id);
        },
        error => {
          console.error('Error deleting PSF:', error);
        }
      );
  }
}

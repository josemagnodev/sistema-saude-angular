import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-psf',
  templateUrl: './psf.component.html',
  styleUrls: ['./psf.component.css']
})
export class PsfComponent implements OnInit {
  psfs: any[] = [];
  psf: any = { name: '', code: '' };
  private apiUrl = 'http://your-api-url/api/psfs';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllPsfs();
  }

  getAllPsfs(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(psfs => {
      this.psfs = psfs;
    });
  }

  editPsf(psf: any): void {
    this.psf = { ...psf };
  }

  deletePsf(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.getAllPsfs();
    });
  }

  onSubmit(): void {
    if (this.psf.id) {
      this.http.put(`${this.apiUrl}/${this.psf.id}`, this.psf).subscribe(() => {
        this.getAllPsfs();
        this.psf = { name: '', code: '' };
      });
    } else {
      this.http.post(this.apiUrl, this.psf).subscribe(() => {
        this.getAllPsfs();
        this.psf = { name: '', code: '' };
      });
    }
  }
}

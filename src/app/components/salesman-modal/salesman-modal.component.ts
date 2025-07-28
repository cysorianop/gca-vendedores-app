import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-salesman-modal',
  standalone: true,
  templateUrl: './salesman-modal.component.html',
  styleUrls: ['./salesman-modal.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class SalesmanModalComponent implements OnInit {
  salesmanForm: FormGroup;
  isEditMode: boolean;
  modalTitle = 'Agregar Vendedor';
  submitButtonText = 'Agregar';
  isLoading = false;

  categories = [
    { label: 'Junior', value: 'junior' },
    { label: 'Senior', value: 'senior' },
    { label: 'Supervisor', value: 'supervisor' }
  ];

  vehicles = ['Moto', 'Carro', 'Bicicleta', 'Caminando'];

  photoOptions = [
    { label: 'Hombre 1', value: 'man1.jpg' },
    { label: 'Mujer 1', value: 'woman1.jpg' },
    { label: 'Hombre 2', value: 'man2.jpg' },
    { label: 'Mujer 2', value: 'woman2.jpg' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SalesmanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    this.modalTitle = this.isEditMode ? 'Editar Vendedor' : 'Agregar Vendedor';
    this.submitButtonText = this.isEditMode ? 'Guardar' : 'Agregar';
    this.salesmanForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.salesmanForm.patchValue(this.data);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      address: ['', Validators.required],
      photo: ['', Validators.required],
      vehicle: ['', Validators.required]
    });
  }

  hasFieldError(fieldName: string): boolean {
    const control = this.salesmanForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(fieldName: string): string {
    const control = this.salesmanForm.get(fieldName);
    if (!control) return '';
    if (control.hasError('required')) return 'Campo requerido';
    if (control.hasError('minlength')) return `Mínimo ${control.getError('minlength').requiredLength} caracteres`;
    return '';
  }

  generateId() {
    const id = 'VEN' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.salesmanForm.get('id')?.setValue(id);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.salesmanForm.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.dialogRef.close(this.salesmanForm.value);
      }, 1000);
    }
  }
}
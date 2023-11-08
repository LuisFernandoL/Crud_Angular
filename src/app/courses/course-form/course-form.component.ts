// import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../services/courses.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form: UntypedFormGroup;
  CoursesService: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSucess(),
      error: () => {
        this.onError();
      },
    });
  }

  onCancel() {
    this.location.back()
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel()
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', { duration: 5000 });
  }
}

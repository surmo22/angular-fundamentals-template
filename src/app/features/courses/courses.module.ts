import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        CoursesComponent,
        CoursesListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FontAwesomeModule
    ],
    exports: [
        CoursesComponent,
        CoursesListComponent
    ]
})
export class CoursesModule { }
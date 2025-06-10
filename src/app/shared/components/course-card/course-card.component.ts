import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date | undefined;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable = false;

  @Output() clickOnShow = new EventEmitter<void>();

  onShowClick(): void {
    this.clickOnShow.emit();
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes.toString().padStart(2, '0')} hours`;
  }
}

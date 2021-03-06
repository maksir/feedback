import {Directive, HostListener, EventEmitter, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FeedbackDialogComponent} from './feedback-dialog/feedback-dialog.component';
import {FeedbackService} from './feedback.service';

@Directive({selector: '[feedback]'}) // tslint:disable-line
export class FeedbackDirective {
  @Output()// tslint:disable-line
  public onSend = new EventEmitter<object>();

  public constructor(private dialogRef: MatDialog, private feedbackService: FeedbackService) {
    this.feedbackService.feedback$.subscribe(
      (feedback) => {
        this.onSend.emit(feedback);
      }
    );
  }

  @HostListener('click')
  public onClick() {
    this.openFeedbackDialog();
  }

  public openFeedbackDialog() {
    this.feedbackService.initScreenshotCanvas(document.documentElement);
    const dialogRef = this.dialogRef.open(FeedbackDialogComponent, {
      disableClose: true,
      height: 'auto',
      width: 'auto'
    });
  }
}

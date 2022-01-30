import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsMoalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title = 'COnfirmation',
          message = 'Are you sure you want to do this?',
          btnOkText = 'Ok',
          btnCancelText = 'Cancel'): Observable<boolean> {
            const config = {
              initialState : {
                title,
                message,
                btnOkText,
                btnCancelText
              }
            }
          this.bsMoalRef = this.modalService.show(ConfirmDialogComponent, config);
          
          return new Observable<boolean>(this.getResult());
          } 
          
  private getResult() {
    return (observer) => {
      const subscription = this.bsMoalRef.onHidden.subscribe(() => {
        observer.next(this.bsMoalRef.content.result);
        observer.complete();
      });
      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }
}

import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent {

  @Input()
  msg: string = "Treść komunikatu";
  @Input()
  closeBtn: boolean = true;
  @Input()
  msgType: string = "I"  // I-info  E-error S-success

  constructor(public activeModal: NgbActiveModal) {
  }

}

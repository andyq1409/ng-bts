import {ModalInfoComponent} from "../app/modal-info/modal-info.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap/modal/modal-ref";

export function msgBox( modalService: NgbModal, message: string, msgType: string, closeBtn: boolean ): NgbModalRef {
  const modalRef = modalService.open(ModalInfoComponent, {centered: true});
  modalRef.componentInstance.msg = message;
  modalRef.componentInstance.msgType = msgType;
  modalRef.componentInstance.closeBtn = closeBtn;
  return modalRef;
}

export function msgLoadOpen(modalService: NgbModal) : void {
  const modalRef = modalService.open(ModalInfoComponent, {centered: true});
  modalRef.componentInstance.msg = "vvvvvvvvvvvvvvvvv";
  modalRef.componentInstance.msgType = "L";
  modalRef.componentInstance.closeBtn = false;
}

export function msgLoadClose(modalService: NgbModal) : void {
  modalService.dismissAll();
}

export function Date2AppDate(dt: Date) : string {
  //let xx = dt.toISOString();
  ///x = dt.getTimezoneOffset();
  let xx = new Date(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
//  console.log(xx.toISOString());
//console.log(xx.toTimeString().substr(12,5));
  return xx.toISOString().substring(0,19)+ xx.toTimeString().substring(12,17);
}

export function Number2NumberPL ( pval: number): string {
  pval = Math.round(pval * 100) / 100;
  console.log( "Number2NumberPL", pval, new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(pval).replace("$","").replace(","," ").replace(".",",")  );
  return new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(pval).replace("$","").replace(","," ").replace(".",",") ;
}

export function NumberPL2Number ( pval: string): number {
  return parseFloat(pval.replace("PLN", "").replace(/\s/g, "").replace(",","."))
}

/*   export function net2dbUser(dt: NetUser): DbUser {
    return {
    id: dt.id,
    username: dt.username,
    password: dt.password,
    imie: dt.imie,
    nazwisko: dt.nazwisko,
    email: dt.email,
    locked: dt.locked,
    data_od: new Date(dt.data_od),
    data_do: (dt.data_do === null) ? null : new Date(dt.data_do),
    data_hasla: new Date(dt.data_hasla),
    roles: dt.roles
    }
  } */

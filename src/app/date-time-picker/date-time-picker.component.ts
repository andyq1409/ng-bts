import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  DoCheck,
  forwardRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NgbTimeStruct,
  NgbDateStruct,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { noop } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
})
export class DateTimePickerComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, DoCheck, OnChanges
{
  // @ts-ignore
  @Output()
  outDate: EventEmitter<string> = new EventEmitter();

  @Input()
  dateString!: string | null;

  @Input()
  inputDatetimeFormat: string = 'yyyy-MM-dd HH:mm:ss';
  @Input()
  hourStep = 1;
  @Input()
  minuteStep = 15;
  @Input()
  secondStep = 30;
  @Input()
  seconds = true;
  @Input()
  required = true;

  @Input()
  enableTime = false;

  public showTimePickerToggle = false;
  public autClose: string = 'outside';
  public lenInput: number = 19;

  public ptTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  public ptStr: string = '';
  public ptDate: NgbDateStruct = { year: 1700, month: 1, day: 1 };

  @ViewChild('dp')
  private dp!: NgbDatepicker;

  @ViewChild(NgbPopover, { static: true })
  private popover!: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;
  private diffTz: number = new Date().getTimezoneOffset() / 60;

  //public ngControl!: NgControl;

  constructor(private config: NgbPopoverConfig) {
    config.placement = 'bottom-right top-right';
  }

  ngOnInit(): void {
    console.log('dtp ngOnInit dateString', this.dateString);
    if (this.dateString === null) {
      let dx = new Date();
      (!this.required)  ? dx = new Date(1700,0,1,1,0,0) : null ;
      dx.setHours(1,0,0);
      (this.enableTime) ? this.lenInput = 19 : this.lenInput = 10;
      (this.required) ? this.ptStr = dx.toISOString().substring(0, this.lenInput).replace('T', ' ') : this.ptStr = "";
      this.ptTime = { hour: 0, minute: 0, second: 0 };
      this.ptDate = { year: dx.getFullYear(), month: dx.getMonth()+1, day: dx.getDate() } ;
    } else {
      let dx = new Date(this.dateString);
      this.ptStr = this.dateString!.substring(0, 19).replace('T', ' ').trim();
      if (!this.enableTime) {
        this.ptStr = this.dateString!.substring(0, 10).replace('T', ' ').trim();
        this.lenInput = 10;
      }
      this.ptTime = Object.assign(this.ptTime, {
        hour: dx.getHours(),
        minute: dx.getMinutes(),
        second: dx.getSeconds(),
      });
      this.ptDate = {
        year: dx.getFullYear(),
        month: dx.getMonth() - 1,
        day: dx.getDate(),
      }; 
    }     
    console.log('dtp ngOnInit ptDate:', this.ptDate);
    console.log('dtp ngOnInit ptTime:', this.ptTime);
    console.log('dtp ngOnInit ptStr:', this.ptStr);
  }
  ngAfterViewInit(): void {
    this.popover.hidden.subscribe(($event) => {
      this.showTimePickerToggle = false;
      // console.log("ngAfterViewInit showTimePickerToggle: ",  this.showTimePickerToggle);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('dtp ngOnChanges SimpleChanges:', changes);

    if (changes['dateString']) {
      console.log('dtp ngOnChanges dateString:', this.dateString);
      //this.dateString = changes["dateString"].currentValue;
      if (this.dateString === null) {
        this.ptStr = '';
        this.ptTime = { hour: 0, minute: 0, second: 0 };
        this.ptDate = { year: 1700, month: 1, day: 1 };
      } else {
        let dx = new Date(this.dateString);
        this.ptStr = this.dateString!.substring(0, 19).replace('T', ' ').trim();
        if (!this.enableTime) {
          this.ptStr = this.dateString!.substring(0, 10)
            .replace('T', ' ')
            .trim();
          this.lenInput = 10;
        }
        this.ptTime = Object.assign(this.ptTime, {
          hour: dx.getHours(),
          minute: dx.getMinutes(),
          second: dx.getSeconds(),
        });
        this.ptDate = {
          year: dx.getFullYear(),
          month: dx.getMonth() + 1,
          day: dx.getDate(),
        };
      }
      console.log('dtp ngOnChanges ptTime:', this.ptTime);
      console.log('dtp ngOnChanges ptStr:', this.ptStr);
      console.log('dtp ngOnChanges ptDate:', this.ptDate);
    }
  }

  ngDoCheck() {
    // console.log("dtp ngDoCheck  ptTime >"+this.ptTime+"<");
    // console.log("dtp ngDoCheck  ptDate >"+this.ptDate+"<");
    // console.log("dtp ngDoCheck  ptStr >"+this.ptStr+"<");
  }

  writeValue(newModel: string) {
    // // console.log("writeValue newModel:",  newModel);
    // if (newModel) {
    //   this.ptTime = Object.assign(
    //     this.ptTime,
    //     ptTimeModel.fromLocalString(newModel)
    //   );
    //   this.dateString = newModel;
    //   this.setDateStringModel();
    // } else {
    //   this.ptTime = new ptTimeModel();
    // }
  }

  registerOnChange(fn: any): void {
    // console.log("registerOnChange fn: ",  fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // console.log("registerOnTouched fn: ",  fn);
    this.onTouched = fn;
  }

  toggleDateTimeState($event: any) {
    // console.log("toggleptTimeState event: ", $event)
    this.showTimePickerToggle = !this.showTimePickerToggle;
    // console.log("toggleptTimeState",  this.showTimePickerToggle);
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    //this.disabled = isDisabled;
  }

  setToday() {
    let dz = new Date();
    this.ptDate = {
      year: dz.getFullYear(),
      month: dz.getMonth(),
      day: dz.getDate(),
    };
    console.log("dtp setToday ptDate", this.ptDate);
    this.ptTime = { hour: 0, minute: 0, second: 0 };
    this.setDateStringModel();
    // console.log("dtp setToday dateString", this.dateString);
    // console.log("dtp setToday ptStr", this.ptStr);
    // console.log("dtp setToday ptTime", this.ptTime);
  }

  onInputChange($event: any) {
    let value = $event.target.value;
    console.log('dtp onInputChange value:', value);
    let dt = new Date(value);

    if (value === '') {
      dt = new Date(1700, 0, 1, 0, 0, 0);
    }
    console.log('dtp onInputChange dt:', dt);
    console.log('dtp onInputChange dt.month:', dt.getMonth());
    console.log('dtp onInputChange dt.day:', dt.getDate());

    if (dt) {
      this.ptTime = {
        hour: dt.getHours(),
        minute: dt.getMinutes(),
        second: dt.getSeconds(),
      };
      if (!this.enableTime) {
        this.ptTime = { hour: 0, minute: 0, second: 0 };
      }
      this.ptDate = {
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
      };
      if (
        this.required &&
        this.ptDate.year === 1700 &&
        this.ptDate.month === 1 &&
        this.ptDate.day === 1
      ) {
        let date = new Date();
        this.ptTime = { hour: 0, minute: 0, second: 0 };
        this.ptDate = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        };
      }
    } else if (value.trim() === '') {
      this.ptTime = { hour: 0, minute: 0, second: 0 };
      console.log('onInputChange 2', this.ptTime);
      this.onChange(this.dateString);
    } else {
      console.log('onInputChange 3', value);
      this.onChange(value);
    }
    //this.ptDate = {year: 1700, month: 1, day: 1};
    console.log('dtp onInputChange ptDate:', this.ptDate);
    this.setDateStringModel();
  }

  onDateChange($event: NgbDateStruct) {
    //const date = new ptTimeModel($event);
    // console.log("onDateChange dateString: ", this.dateString );
    console.log('onDateChange event: ', $event);
    this.ptDate = $event;

    // if (!date) {
    //   this.dateString = this.dateString;
    //   return;
    // }
    //
     if ( isNaN(this.ptTime.hour) && !isNaN(this.ptDate.year) ) {
       this.ptTime = {hour: 0, minute: 0, second: 0};
     }
    //
    // this.ptTime.year = date.year;
    // this.ptTime.month = date.month;
    // this.ptTime.day = date.day;
    //
    // const adjustedDate = new Date(this.ptTime.toString());
    // if (this.ptTime.timeZoneOffset !== adjustedDate.getTimezoneOffset()) {
    //   this.ptTime.timeZoneOffset = adjustedDate.getTimezoneOffset();
    // }
    // console.log("dtp onDateChange ptTime:", this.ptTime);

    this.setDateStringModel();
  }

  onTimeChange($event: NgbTimeStruct) {
    console.log('dtp onTimeChange event:', $event);
    this.ptTime.hour = $event.hour;
    this.ptTime.minute = $event.minute;
    this.ptTime.second = $event.second;

    this.setDateStringModel();
  }

  // this.dateString = this.ptTime.toString();
  //
  // let ptStrx = this.dateString!.substring(0,19).replace("T"," ").trim();
  // if (!this.enableTime) {
  //   ptStrx = this.dateString.substring(0, 10).replace("T", " ").trim();
  // }
  //
  // if ( this.ptTime.year === 1700 && this.ptTime.month === 1 && this.ptTime.day ===1 ) {
  //   this.dateString = "";
  //   ptStrx = "";
  // }
  // console.log("dtp setDateStringModel ptStr:", ptStrx);
  //setTimeout(() => {

  setDateStringModel() {
    console.log('dtp setDateStringModel ptDate:', this.ptDate);
    console.log('dtp setDateStringModel ptTime:', this.ptTime);
    let valOut: string = '';
    let valOut2: string = '';
    if (
      this.ptDate.year === 1700 &&
      this.ptDate.month === 1 &&
      this.ptDate.day === 1
    ) {
      this.ptStr = '';
      valOut = '';
    } else {
      let dx = new Date(
        this.ptDate.year,
        this.ptDate.month - 1,
        this.ptDate.day,
        this.ptTime.hour - this.diffTz,
        this.ptTime.minute,
        this.ptTime.second
      );
      valOut = dx.toISOString().substring(0, 19).replace('T', ' ');
      valOut2 = dx.toTimeString().substring(12, 17);
      valOut = valOut + valOut2;
      // console.log("dtp setDateStringModel dx.toISOString:" + dx.toTimeString().substring(0,19) + ".");
      // console.log("dtp setDateStringModel dx.toTimeString:" + dx.toTimeString().substring(12,17) + ".");
      // console.log("dtp setDateStringModel dx:", dx);
      // console.log("dtp setDateStringModel str dx:", dx.toISOString());
      this.ptStr = dx.toISOString().substring(0, 19).replace('T', ' ').trim();
      if (!this.enableTime) {
        this.ptStr = dx.toISOString().substring(0, 10).replace('T', ' ').trim();
      }
    }
    console.log('dtp setDateStringModel ptStr:', this.ptStr);
    console.log('dtp setDateStringModel emit outDate:', valOut);
    this.outDate.emit(valOut.replace('T', ' '));
    //}, 40);
  }

  /*
 const event = new Date('2022-12-31T01:27:45+0100');
console.log(event.toISOString());
console.log(event.getTimezoneOffset());
let xx = new Date(event.getTime() - event.getTimezoneOffset() * 60 * 1000);
console.log(xx.toISOString()); console.log(xx.toTimeString().substr(12,5));
console.log(xx.toISOString().substr(0,19)+xx.toTimeString().substr(12,5));   */

  inputBlur($event: any) {
    this.onTouched();
  }
}

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
  NgbDatepicker

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
  nazwa = "dtp";

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
  private diffTz: number = Math.abs(new Date().getTimezoneOffset() / 60);

  //public ngControl!: NgControl;

  constructor(private config: NgbPopoverConfig) {
    config.placement = 'bottom-right top-right';
  }

  ngOnInit(): void {
    console.log(this.nazwa +' ngOnInit dateString', this.dateString);
    if (!this.enableTime) {
      this.dateString = this.dateString!.substring(0,10) + " 00:00:00+0" + this.diffTz.toString() + "00";
      console.log(this.nazwa +' ngOnInit corected dateString', this.dateString);
    }

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
      (!this.enableTime) ? this.lenInput = 19 : null;
      this.ptDate = {
        year: dx.getFullYear(),
        month: dx.getMonth() + 1,
        day: dx.getDate(),
      };
    }
    console.log(this.nazwa +' ngOnInit ptDate:', this.ptDate);
    console.log(this.nazwa +' ngOnInit ptTime:', this.ptTime);
    console.log(this.nazwa +' ngOnInit ptStr:', this.ptStr);
  }
  ngAfterViewInit(): void {
    this.popover.hidden.subscribe(($event) => {
      this.showTimePickerToggle = false;
      // console.log("ngAfterViewInit showTimePickerToggle: ",  this.showTimePickerToggle);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.nazwa +' ngOnChanges SimpleChanges:', changes);

    if (changes['dateString']) {
      console.log(this.nazwa +' ngOnChanges dateString:', this.dateString);
      if (!this.enableTime) {
        this.dateString = this.dateString!.substring(0,10) + " 00:00:00+0" + this.diffTz.toString() + "00";
        console.log(this.nazwa +' ngOnChanges corected dateString', this.dateString);
      }
      //this.dateString = changes["dateString"].currentValue;
      if (this.dateString === null) {
        this.ptStr = '';
        this.ptTime = { hour: 0, minute: 0, second: 0 };
        this.ptDate = { year: 1700, month: 1 ,day: 1 };
      } else {
        let dx = new Date(this.dateString);
        this.ptStr = this.dateString!.substring(0, 19).replace('T', ' ').trim();
        this.ptTime = Object.assign(this.ptTime, {
          hour: dx.getHours(),
          minute: dx.getMinutes(),
          second: dx.getSeconds(),
        });
        if (!this.enableTime) {
          this.ptStr = this.dateString!.substring(0, 10)
            .replace('T', ' ')
            .trim();
          this.lenInput = 10;
          this.ptTime = { hour: 0, minute: 0, second: 0 }
        }
        this.ptDate = {
          year: dx.getFullYear(),
          month: dx.getMonth() + 1,
          day: dx.getDate(),
        };
      }
      console.log(this.nazwa +' ngOnChanges ptTime:', this.ptTime);
      console.log(this.nazwa +' ngOnChanges ptStr:', this.ptStr);
      console.log(this.nazwa +' ngOnChanges ptDate:', this.ptDate);
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
    console.log(this.nazwa +' onInputChange value:', value);
    let dt = new Date(value);

    if (value === '') {
      dt = new Date(1700, 0, 1, 0, 0, 0);
    }
    console.log(this.nazwa +' onInputChange dt:', dt);
    console.log(this.nazwa +' onInputChange dt.month:', dt.getMonth());
    console.log(this.nazwa +' onInputChange dt.day:', dt.getDate());

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
    console.log(this.nazwa +' onInputChange ptDate:', this.ptDate);
    this.setDateStringModel();
  }

  onDateChange($event: NgbDateStruct) {
    // console.log("onDateChange dateString: ", this.dateString );
    console.log('onDateChange event: ', $event);
    this.ptDate = $event;
     if ( isNaN(this.ptTime.hour) && !isNaN(this.ptDate.year) ) {
       this.ptTime = {hour: 0, minute: 0, second: 0};
     }
    this.setDateStringModel();
  }

  onTimeChange($event: NgbTimeStruct) {
    console.log(this.nazwa +' onTimeChange event:', $event);
    this.ptTime.hour = $event.hour;
    this.ptTime.minute = $event.minute;
    this.ptTime.second = $event.second;

    this.setDateStringModel();
  }

  setDateStringModel() {
    console.log(this.nazwa +' setDateStringModel ptDate:', this.ptDate);
    console.log(this.nazwa +' setDateStringModel ptTime:', this.ptTime);
    (!this.enableTime) ? this.ptTime = {hour: 0, minute: 0, second: 0} : null;
    let valOut: string = '';
    let valOut2: string = '';
    if ( this.ptDate.year === 1700 && this.ptDate.month === 1 && this.ptDate.day === 1) {
      this.ptStr = ''; valOut = ''
    } else {
      let dx = new Date(this.ptDate.year, this.ptDate.month - 1, this.ptDate.day,
        this.ptTime.hour, this.ptTime.minute, this.ptTime.second
      );
      valOut = [this.ptDate.year, this.ptDate.month.toString().padStart(2, '0'), this.ptDate.day.toString().padStart(2,"0")].join("-") + " " +
               [this.ptTime.hour.toString().padStart(2,"0"), this.ptTime.minute.toString().padStart(2,"0"), this.ptTime.second.toString().padStart(2,"0") ].join(":") +
                dx.toTimeString().substring(12, 17);
      this.ptStr = valOut.substring(0, 19).trim();
      if (!this.enableTime) {
        this.ptStr = valOut.substring(0, 10).trim();
      }
    }
    console.log(this.nazwa +' setDateStringModel emit outDate:', valOut);
    console.log(this.nazwa +' setDateStringModel ptStr:', this.ptStr);
    this.outDate.emit(valOut.replace('T', ' '));
    //}, 40);
  }

  inputBlur($event: any) {
    this.onTouched();
  }
}

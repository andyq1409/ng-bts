import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  Injector, DoCheck, forwardRef, OnChanges, SimpleChanges, Output, EventEmitter
} from "@angular/core";
import {
  NgbTimeStruct,
  NgbDateStruct, NgbCalendar,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker
} from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { DateTimeModel } from "./date-time.model";
import { noop } from "rxjs";
import { NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

@Component({
  selector: "date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.css"],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, DoCheck, OnChanges{


  // @ts-ignore
  @Output()
  outDate: EventEmitter<string> = new EventEmitter();

  @Input()
  dateString!: string | null;

  @Input()
  inputDatetimeFormat: string = "yyyy-MM-dd HH:mm:ss";
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
  public autClose: string = "outside";

  public datetime: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;
  public dtStr: string = "";
  public lenInput: number = 19;
  public dtpDate: NgbDateStruct = {year: 1700, month: 1, day: 1};

  @ViewChild("dp")
  private dp!: NgbDatepicker;

  @ViewChild(NgbPopover, { static: true })
  private popover!: NgbPopover;


  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  //public ngControl!: NgControl;

  constructor(private config: NgbPopoverConfig, 
    private inj: Injector, private calendar: NgbCalendar) {
    config.placement = "bottom-right top-right";
  }

  ngOnInit(): void {
    // console.log("dtp ngOnInit dateString", this.dateString);
    if ( this.required && this.dateString === null) {
      this.dateString = new Date().toISOString().substring(0,19).replace("T"," ");
    }
    this.dtStr = this.dateString!.substring(0,19).replace("T"," ").trim();
    // console.log("dtp ngOnInit dtStr", this.dtStr);
    if (!this.enableTime) {
      this.dtStr = this.dateString!.substring(0, 10).replace("T", " ").trim();
      this.lenInput = 10;
      this.autClose = "inside";
    }
    this.datetime = Object.assign(
      this.datetime,
      DateTimeModel.fromLocalString(this.dateString!)); 
    
    // console.log("dtp ngOnInit datetime", this.datetime);
  }

  ngAfterViewInit(): void {
    this.popover.hidden.subscribe($event => {
      this.showTimePickerToggle = false;
      // console.log("ngAfterViewInit showTimePickerToggle: ",  this.showTimePickerToggle);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("dtp ngOnChanges SimpleChanges:", changes);
    // console.log("dtp ngOnChanges dateString:", this.dateString);
    //this.dateString = changes["dateString"].currentValue;
    this.dtStr = this.dateString!.substring(0,19).replace("T"," ").trim();
    if (!this.enableTime) {
      this.dtStr = this.dateString!.substring(0, 10).replace("T", " ").trim();
      this.lenInput = 10;
    }
    // console.log("dtp ngOnChanges dtStr:", this.dtStr);
    this.datetime = Object.assign(
      this.datetime,
      DateTimeModel.fromLocalString(this.dateString!));
    // console.log("dtp ngOnChanges datetime:", this.datetime);
    //// console.log("dtp ngOnChanges dp:", this.dp);
    //this.dp.startDate = this.datetime;
    this.dtpDate.day = this.datetime.day;
    this.dtpDate.month = this.datetime.month;
    this.dtpDate.year = this.datetime.year;
    // console.log("dtp ngOnChanges dtpDate:", this.dtpDate);
  }

  ngDoCheck() {
    // console.log("ngDoCheck  dtStr >"+this.dtStr+"<");
  }

  writeValue(newModel: string) {
    // console.log("writeValue newModel:",  newModel);
    if (newModel) {
      this.datetime = Object.assign(
        this.datetime,
        DateTimeModel.fromLocalString(newModel)
      );
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
    }
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
    // console.log("toggleDateTimeState event: ", $event)
    this.showTimePickerToggle = !this.showTimePickerToggle;
    // console.log("toggleDateTimeState",  this.showTimePickerToggle);
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    //this.disabled = isDisabled;
  }

  setToday() {
    let dz = new Date();
    this.dtpDate = { year: dz.getFullYear(), month: dz.getMonth()+1, day: dz.getDate()};
    // console.log("dtp setToday dtpDate", this.dtpDate);
    this.datetime = new DateTimeModel(this.dtpDate);
    this.setDateStringModel();
    // console.log("dtp setToday dateString", this.dateString);
    // console.log("dtp setToday dtStr", this.dtStr);
    // console.log("dtp setToday datetime", this.datetime);
  }

  onInputChange($event: any) {
    let value = $event.target.value;
    // console.log("onInputChange $event",  $event);
    // console.log("onInputChange value",  value);
    const dt = DateTimeModel.fromLocalString(value);

    if (dt) {
      this.datetime = dt;
      if (!this.enableTime) {
        this.datetime.hour = 0;
        this.datetime.minute = 0;
        this.datetime.second = 0;
      }
    if (this.required && this.datetime.year === 1700 && 
      this.datetime.month === 1 && this.datetime.day ===1) {
        let date = new Date();
        this.datetime = new DateTimeModel({
          year: date.getFullYear(),
          month: date.getMonth()+1,
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
          timeZoneOffset: date.getTimezoneOffset()});
      }
 

      // console.log("onInputChange 1",  dt);
      this.setDateStringModel();
    } else if (value.trim() === "") {
      this.datetime = new DateTimeModel();
      this.dateString = "";
      // console.log("onInputChange 2",  this.datetime);
      this.onChange(this.dateString);
    } else {
      // console.log("onInputChange 3",  value);
      this.onChange(value);
    }
    this.dtpDate.day = this.datetime.day;
    this.dtpDate.month = this.datetime.month;
    this.dtpDate.year = this.datetime.year;
    // console.log("dtp onInputChange dtpDate:", this.dtpDate);
  }

  onDateChange($event: any) {
    const date = new DateTimeModel($event);
    // console.log("onDateChange dateString: ", this.dateString );
    // console.log("onDateChange date: ", date);

    if (!date) {
      this.dateString = this.dateString;
      return;
    }

    if (!this.datetime) {
      this.datetime = date;
    }

    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;

    const adjustedDate = new Date(this.datetime.toString());
    if (this.datetime.timeZoneOffset !== adjustedDate.getTimezoneOffset()) {
      this.datetime.timeZoneOffset = adjustedDate.getTimezoneOffset();
    }
    // console.log("dtp onDateChange datetime:", this.datetime);

    this.setDateStringModel();
  }

  onTimeChange(event: NgbTimeStruct) {

    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;

    this.setDateStringModel();
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();

    let dtStrx = this.dateString!.substring(0,19).replace("T"," ").trim();
    if (!this.enableTime) {
      dtStrx = this.dateString.substring(0, 10).replace("T", " ").trim();
    }

    if ( this.datetime.year === 1700 && this.datetime.month === 1 && this.datetime.day ===1 ) {
      this.dateString = "";
      dtStrx = "";
    }
    // console.log("dtp setDateStringModel dtStr:", dtStrx);
    //setTimeout(() => {
      this.dtStr = dtStrx;
      this.outDate.emit(this.dateString!.substring(0,19).replace("T"," ").trim());
    //}, 40);
  }

  inputBlur($event: any) {
    this.onTouched();
  }
}

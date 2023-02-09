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
  NgbDateStruct,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker
} from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { DateTimeModel } from "./date-time.model"
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
  dateString!: string;

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
  enableTime = false;

  public showTimePickerToggle = false;

  public datetime: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;
  public dtStr: string = "";
  public lenInput: number = 19;

  // @ViewChild(NgbDatepicker, { static: true })
  // private dp: NgbDatepicker;

  @ViewChild(NgbPopover, { static: true })
  private popover!: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  //public ngControl!: NgControl;

  constructor(private config: NgbPopoverConfig, private inj: Injector) {
    config.autoClose = "outside";
    config.placement = "top-right bottom-right";
  }

  ngOnInit(): void {
    // console.log("ngOnInit dateString", this.dateString);
    this.dtStr = this.dateString.substring(0,19).replace("T"," ").trim();
    if (!this.enableTime) {
      this.dtStr = this.dateString.substring(0, 10).replace("T", " ").trim();
      this.lenInput = 10;
    }
    this.datetime = Object.assign(
      this.datetime,
      DateTimeModel.fromLocalString(this.dateString));
  }

  ngAfterViewInit(): void {
    this.popover.hidden.subscribe($event => {
      this.showTimePickerToggle = false;
      // console.log("ngAfterViewInit showTimePickerToggle: ",  this.showTimePickerToggle);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("ngOnChanges SimpleChanges:", changes);
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
  }

  onDateChange($event: string | NgbDateStruct, dp: NgbDatepicker) {
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
    this.dtStr = this.dateString!.substring(0,19).replace("T"," ").trim();
    if (!this.enableTime) {
      this.dtStr = this.dateString.substring(0, 10).replace("T", " ").trim();
    }
    if (this.datetime.year == 1800) {
      this.dateString = "";
      this.dtStr = "";
    }
    this.outDate.emit(this.dateString);
  }

  inputBlur($event: any) {
    this.onTouched();
  }
}

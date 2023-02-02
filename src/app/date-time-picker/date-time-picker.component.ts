import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  AfterViewInit,
  Injector
} from "@angular/core";
import {
  NgbTimeStruct,
  NgbDateStruct,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker,
  NgbTimepicker
} from "@ng-bootstrap/ng-bootstrap";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { DateTimeModel } from "../date-time.model";
import { noop } from "rxjs";

@Component({
  selector: "app-date-time-picker",
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
  implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input()
  dateString!: string;

  @Input()
  inputDatetimeFormat = "yyyy-MM-dd HH:mm:ss";
  @Input()
  hourStep = 1;
  @Input()
  minuteStep = 10;
  @Input()
  secondStep = 10;
  @Input()
  seconds = true;

  @Input()
  disabled = false;

  public showTimePickerToggle = false;

  public datetime: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;

  // @ViewChild(NgbDatepicker, { static: true })
  // private dp: NgbDatepicker;

  @ViewChild(NgbPopover, {static: true})
  private popover!: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  public ngControl!: NgControl;

  constructor(private config: NgbPopoverConfig, private inj: Injector) {
    config.autoClose = "outside";
    config.placement = "top-right bottom-right";
  }

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.popover.hidden.subscribe($event => {
      this.showTimePickerToggle = false;
    });
  }

  writeValue(newModel: string) {
    if (newModel) {
      console.log("writeValue  newModel:", newModel);
      this.datetime = Object.assign(
        this.datetime,
        DateTimeModel.fromLocalString(newModel)
      );
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
    }
    console.log("writeValue  this.datetime:", this.datetime);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event: any) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange($event: any) {
    const value = $event.target.value;
    const dt = DateTimeModel.fromLocalString(value);
    console.log("onInputChange 1 value:", value);

    if (dt) {
      this.datetime = dt;
      this.setDateStringModel();
    } else if (value.trim() === "") {
      this.datetime = new DateTimeModel();
      this.dateString = "";
      this.onChange(this.dateString);
    } else {
      this.onChange(value);
    }
    console.log("onInputChange 2 this.datetime:", this.datetime);
  }

  onDateChange($event: string | NgbDateStruct) {
    const date = new DateTimeModel($event);

    if (!date) {
      this.dateString = this.dateString;
      console.log("onDateChange not date");
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

    console.log("onDateChange this.datetime:", this.datetime);
    this.setDateStringModel();
  }

  onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;
    console.log("onTimeChange this.datetime:", this.datetime);

    this.setDateStringModel();
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();
    console.log("setDateStringModel this.dateString:", this.dateString);

    if (!this.firstTimeAssign) {
      this.onChange(this.dateString);
    } else {
      // Skip very first assignment to null done by Angular
      if (this.dateString !== null) {
        this.firstTimeAssign = false;
      }
    }
  }

  inputBlur($event: any) {
    this.onTouched();
  }
}


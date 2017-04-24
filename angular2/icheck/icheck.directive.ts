import { Directive, ElementRef, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from '@angular/forms';
declare var $;

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IcheckDirective),
  multi: true
};

const noop = () => {
};

@Directive({
  selector: '[icheck]',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class IcheckDirective implements ControlValueAccessor {
  @Input()
  set disabled(tmp: any) {
    this.$dom.iCheck(!!tmp?"disable":"enable");
  }

  @Input()
  set indeterminate(tmp: any) {
    this.$dom.iCheck(!!tmp?"indeterminate":"determinate");
  }

  type = "";//inpyt type
  checked: boolean; //checkbox ifchecked
  value: any;//radio value
  $dom: any;// input $(dom)


  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
  writeValue(value: any) {
    switch (this.type) {
      case "radio":
        this.value = value;
        if (this.$dom.val() == value) {
          this.$dom.iCheck('check');
        }
        break;
      case "checkbox":
        this.checked = !!value;
        this.$dom.iCheck(!!value ? 'check' : 'uncheck');
        break;
    }
  }

  constructor(private el: ElementRef) {
    let _this = this;
    let $dom = _this.$dom = $(el.nativeElement);
    _this.type = $dom.attr("type").toLowerCase();
    $dom.iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      indeterminateClass: 'indeterminate'
    });
    switch (_this.type) {
      case "radio":
        $dom.on("ifClicked", function(event) {
          _this.value = this.value;
          _this.onChangeCallback(_this.value);
        })
        break;
      case "checkbox":
        $dom.on("ifChanged", function(event) {
          _this.checked = this.checked;
          _this.onChangeCallback(_this.checked);
        })
        break;
      default:
        throw "type error。icheck must be radio or checkbox";
    }
  }
}


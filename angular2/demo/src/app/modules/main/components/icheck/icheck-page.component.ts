import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'icheck-page.component.html',
  styleUrls: ['icheck-page.component.scss']
})
export class IcheckPageComponent{
  constructor() { }
  radioSample1 = "1";

  checkboxSample1 = false;
  checkboxSample1Disable = false;
  checkboxSample1Indeterminate = false;


  //全选状态
  fullChecked = false;
  count = 0;
  //半选状态
  fullCheckedIndeterminate = false;
  toggleFullCheckIndeterminate(v) {
    this.fullCheckedIndeterminate = v;
  }
  toggleIndeterminate(item, v) {
    item.indeterminate = v;
  }
  fullCheck = [{
    id: 1, name: "dept1", depts: [
      { id: "1-1", checked: false, name: "dept1-1", indeterminate: false, count: 0 },
      { id: "1-2", checked: false, name: "dept1-2", indeterminate: false, count: 0 },
      { id: "1-3", checked: false, name: "dept1-3", indeterminate: false, count: 0 }], indeterminate: false, count: 0, checked: false
  },
    {
      id: 2, name: "dept2", depts: [
        { id: "2-1", checked: false, name: "dept2-1", indeterminate: false, count: 0 },
        { id: "2-2", checked: false, name: "dept2-2", indeterminate: false, count: 0 },
        { id: "2-3", checked: false, name: "dept2-3", indeterminate: false, count: 0 }], indeterminate: false, count: 0, checked: false
    },
    { id: 3, name: "dept3", checked: false, indeterminate: false, count: 0 },
    { id: 4, name: "dept4", checked: false, indeterminate: false, count: 0 },
    { id: 5, name: "dept5", checked: false, indeterminate: false, count: 0 }]

  logList = [];
  logRec = 0;
  log(f, e, t) {
    let _this = this;
    let cap = `id:${t.id}
  value:${t.value}
  checked:${t.checked}`;

    if (this.logRec > 0) {
      clearTimeout(this.logRec);
    }
    this.logList.push({ class: this.logRec, event: f, target: t, cap: cap, value: e });
    this.logRec = setTimeout(() => {
      _this.logRec = 0;
    })
    setTimeout(() => {
      _this.logList.splice(0, 1);
    }, 10000);
  }
  clickInput(e, t) {
    this.log("click", e, t);
  }
  changeInput(e, t) {
    this.log("change", e, t);
  }
}

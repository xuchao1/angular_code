import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomSettingService } from 'app/core';

import { Subject } from 'rxjs/Subject';

export function Pager() {

  let properties = ["size", "number", "totalElements", "totalPages"];
  let countdown;
  let triggerOnchange = [];
  function countdownToChange() {
    if (countdown) {
      clearTimeout(countdown);
    }
    countdown = setTimeout(() => {
      triggerOnchange.forEach(k=>{
        if(typeof k == "function"){
          k();
        }
      });
    }, 100);
  }

  properties.forEach(key => {
    let val = 0;
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return val;
      },
      set: function(newVal) {
        countdownToChange();
        val = newVal;
      }
    })
  });

  this.size = 10;
  this.number = 1;
  this.totalElements = 0;
  this.totalPages = 1;

  this.onChange = function(event) {
    triggerOnchange.push(event);
  }
  this.set = (k, v) => {
    if (!v && typeof k == "object") {
      properties.forEach(variable => {
        if (k[variable] !== undefined) {
          this[variable] = k[variable];
        }
      });
    }
    else if (properties.indexOf(k) > -1) {
      this[k] = v;
    }
  }
}

@Component({
  selector: 'xc-pager',
  templateUrl: 'xc-pager.component.html',
  styleUrls: ['xc-pager.component.scss']
})
export class PagerPageComponent implements OnInit {

  @Input("data") pagerData: any;
  @Output() onChange = new EventEmitter();
  constructor(private CustomSettingService: CustomSettingService) {
  }
  pageSize: number;

//选择页码跳转专用
  private pageNo;
  private pagerList = [];

  //获取localstrage pageSize数字
  private initSetting() {
    let setting = this.CustomSettingService.getSetting();
    this.pageSize = setting.pageSize;
  }
  //分页器初始化
  initPage() {
    let {totalPages:t,pageNo:p} = this.pagerData;//解构

    this.pagerList.length = 0;//快速清空数组
    if (t <= 7) {
      for (var i = 1; i < t + 1; i++) {
        this.pagerList.push({
          page: i
        })
      }
      return;
    }
    this.pagerList.push({ page: 1 });
    if (p <= 4) {
      let i = 2;
      for (; i < 6; i++) {
        this.pagerList.push({ page: i });
      }
      this.pagerList.push({
        page: -1
      });
    } else if (t - p <= 3) {
      this.pagerList.push({
        page: -1
      })
      let i = t - 4;
      for (; i < t; i++) {
        this.pagerList.push({ page: i });
      }
    } else {
      this.pagerList.push({
        page: -1
      })
      let i = p - 1;
      for (; i < p + 2; i++) {
        this.pagerList.push({ page: i });
      }
      this.pagerList.push({
        page: -1
      })
    }
    this.pagerList.push({ page: t });
  }
  prevNextPage(_p) {
    if (_p == 'prev') {
      if(this.pagerData.number<=1){
        return;
      }
      this.pagerData.number = this.pagerData.number - 1;
    } else if (_p == 'next') {
      if(this.pagerData.number>=this.pagerData.totalPage){
        return;
      }
      this.pagerData.number = this.pagerData.number + 1;
    }
    this.onChange.emit(this.pagerData);
  }
  //分页器点击事件
  changePage(_p) {
    let p = 1;
    if (typeof _p == "string") {
      p = Number.parseInt(_p);
    } else if (typeof _p == "number") {
      p = _p;
    } else {
      throw "type error";
    }
    //-1为不处理按钮
    if (p == -1) {
      return;
    } else {
      if (isNaN(p)) {
        alert('请输入整数数字');
        return;
      }
      if (p < 1) {
        alert('页码不能小于1')
        return;
      }
      if (p > this.pagerData.totalPages) {
        alert('页码过大')
        return;
      }
      this.pagerData.number = p;
      this.pageNo = '';
    }
    this.onChange.emit(this.pagerData);
  }
  //修改pagesize,保存到通用设置
  changePageSize(size) {
    if(size != this.pageSize){
      this.CustomSettingService.set("pageSize", size);
      this.pageSize = size;
      this.pagerData.size = size;
      this.onChange.emit(this.pagerData);
    }
  }
  ngOnInit() {
    //获取pagesize
    this.initSetting();
    if (!this.pagerData) {
      this.pagerData = new Pager();
    }
    this.pagerData.size = this.pageSize;
    this.pagerData.onChange(()=>{
      // setTimeout(()=>{
        this.initPage();
      // })
    })
    this.onChange.emit(this.pagerData);
  }
}

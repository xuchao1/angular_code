import { Injectable,Type,ComponentFactory,ViewContainerRef,ComponentRef } from '@angular/core';
import { XcComponentsLoaderService } from "./xc-components-loader.service";
import { XcBaseModal,XcModalRef } from "../index";

@Injectable()
export class XcModalService {
  constructor(private xcComponentsLoaderService:XcComponentsLoaderService) {
  }

  getInstance(_this):XcModalRef{
    let list = this.xcComponentsLoaderService.modalList;
    for(let i = 0;i<list.length;i++){
      if(list[i]._componentRef.instance == _this){
        return list[i];
      }
    }
    return null;
  }
  closeAll(){
    this.xcComponentsLoaderService.destroyAll();
  }
  createModal(component:Type<XcBaseModal>,data?:any){
    return this.xcComponentsLoaderService.addComponent(component,data);
  }
}

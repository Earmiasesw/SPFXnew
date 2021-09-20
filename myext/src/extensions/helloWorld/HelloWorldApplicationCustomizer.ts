import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HelloWorldApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this,this. CustomHeader)
    return Promise.resolve();

  }

public CustomHeader(){
  
  //this is just for knowledge
  this.context.placeholderProvider.placeholderNames.map((placeholdername)=>{
    console.log(this.context.placeholderProvider.placeholderNames);
    console.log(this.context.placeholderProvider);
  //   var currentPageUrl = this.context.pageContext.site.serverRequestPath;
  //  console.log(currentPageUrl);
    
  });

  //this will create a dom element for top

this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top).domElement.innerHTML=

"<div style='background-color:coral;height:25px; text-align:center'>The warining message will be peresented here on spfx extension</div>";

  //this will create a dom element for bottom

this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom).domElement.innerHTML=

 "<div style='background-color:coral;height:25px; text-align:center'>custom footer</div>";



}



}

import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import { SPHttpClient } from "@microsoft/sp-http";
import { SPComponentLoader } from "@microsoft/sp-loader";


export interface IHelloWorldWebPartProps {
  description: string;

}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {



  public render(): void {
    let BootstrapCss = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
    SPComponentLoader.loadCss(BootstrapCss)

    let myapiUrl = `https://ewoldemariam.sharepoint.com/sites/XGILITYPROJECTS/_api/web/lists/getbytitle('Employees')/items`;

    this.getSpdata(myapiUrl).then(response => {

      let items = response.value;


      this.domElement.innerHTML = `
      <div>
      <div class='row'>

      ${this.CreateRow(items)}
      <h1>Gobo</h1>

    </div>
      </div>
      `;

    }, error => {
      console.error('error happend at the top', error)
    })



  }

  private CreateRow(items) {


    let rows = '';

    for (let i of items) {
      rows += this.createCol(i)
    }

    console.log('row sucesfully called')

    return `
    <div class='row'>
    ${rows}
    </div>`;

  }

  private createCol(i) {
    console.log('col sucesfully called')
    return `<div class='col-sm-4 mb-2'>
    <div class="card">
    <img class="card-img-top" src=${i.Photo} alt="Card image" ">
    <div class="card-body">
      <h4 class="card-title">${i.Title}</h4>
      <p class="card-text">${i.Bio}</p>
      <a href="#" class="btn btn-primary">See Profile</a>
    </div>
   </div>
  </div>
  <br/>`


  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private getSpdata(apiURL) {
    return this.context.spHttpClient.get(apiURL, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json().then(
          response => {
            let items = response;
            return items
          }

        )

      },
        error => {
          console.error('error happend', error)

        })


  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

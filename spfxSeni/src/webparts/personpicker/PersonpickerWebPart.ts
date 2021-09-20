import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient } from "@microsoft/sp-http";

import styles from './PersonpickerWebPart.module.scss';
import * as strings from 'PersonpickerWebPartStrings';

export interface IPersonpickerWebPartProps {
  description: string;
  listName: string;
  maxItems: number;
}

export default class PersonpickerWebPart extends BaseClientSideWebPart<IPersonpickerWebPartProps> {

  public render(): void {

    let bootstrap4Url = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
    SPComponentLoader.loadCss(bootstrap4Url);

    let webUrl = this.context.pageContext.web.absoluteUrl;
    let employeeListUrl = `${webUrl}/_api/web/lists/getbytitle('${this.properties.listName}')/items?$top=${this.properties.maxItems}`


    this.context.spHttpClient.get(employeeListUrl, SPHttpClient.configurations.v1).then(response => {


    }, error => {
      console.error('error happend', error)
    }
    )


    this.context.spHttpClient.get(employeeListUrl, SPHttpClient.configurations.v1).then(response => {
      response.json().then(response => {
        let items = response.value;
        console.log('spdata read sucesfully', items);
        this.domElement.innerHTML = `

        <h1>${this.properties.listName}</h1>
     
        
        ${this.Gettable(items)}
      
        `
      });



    }, error => {
      console.error('error happend', error)
    }
    )

  }



  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  private getSPData(apiUrl) {
    return this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)
      .then(response => {
        return response.json();
      })
  }


  private renderRowHtml(items) {
    let colitems = ``
    for (let i of items) {
      colitems += this.renderColHtml(i);
    }

    return `
    <div class='row'>
    ${colitems}
    </div>  
        `;
  }

  private renderColHtml(i) {
    return `<div class='col-sm-4'>
  <div class="card">
  <img class="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Card image" style="width:100%">
  <div class="card-body">
    <h4 class="card-title">${i.Title}</h4>
    <p class="card-text">${i.Bio}</p>
    <a href="#" class="btn btn-primary">See Profile</a>
  </div>
  </div>
  </div>`


  }


  private Gettable(items) {



    let rows = '';

    for (let i of items) {
      rows += this.tablecolumn(i)

    }

    return `
  <table class="table">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
    ${rows}
    </tbody>
    </table>
  `

  }

  private tablecolumn(i) {
    return `
    <tr>
    <td>${i.Title}</td>
    <td>${i.Phone}</td>
    <td>${i.Email}</td>
    </tr>
    
    `
  }



  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }








  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'General Setting'
          },
          groups: [
            {
              groupName: 'Webpart Setting',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: "List Title",
                  placeholder: 'Type your list title'
                }), PropertyPaneSlider('maxItems', {
                  label: "Max Items",
                  min: 5,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1

                })
              ]
            }
          ]
        }
      ]
    };
  }
}

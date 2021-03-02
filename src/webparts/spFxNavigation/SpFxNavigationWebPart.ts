import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxNavigationWebPartStrings';
import SpFxNavigation from './components/SpFxNavigation';
import { ISpFxNavigationProps } from './components/ISpFxNavigationProps';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface ISpFxNavigationWebPartProps {
  description: string;
  context: WebPartContext;
  spHttpClient: any;
  siteUrl: string;
  listName: string;
}

export default class SpFxNavigationWebPart extends BaseClientSideWebPart<ISpFxNavigationWebPartProps> {
  protected onInit(): Promise<void> {
    SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<ISpFxNavigationProps> = React.createElement(
      SpFxNavigation,
      {
        description: this.properties.description,
        context: this.context,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: '',
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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

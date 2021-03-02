import * as React from "react";

import "../Admin/Admin.module.css";
import { Label, ILabelStyles } from "office-ui-fabric-react/lib/Label";
import { DefaultPalette, IStyleSet } from "office-ui-fabric-react/lib/Styling";
import { IDocumentCardStyles } from "office-ui-fabric-react/lib/DocumentCard";
import {
  Stack,
  StackItem,
  IStackStyles,
  DefaultButton,
  IIconProps,
  IButtonStyles,
  IStackTokens,
} from "office-ui-fabric-react";
import { NavLink, HashRouter, Switch, Link, Route } from "react-router-dom";
import {
  Breadcrumb,
  IBreadcrumbItem,
  IDividerAsProps,
} from "office-ui-fabric-react/lib/Breadcrumb";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import AdvanceOptions from './AdvanceOptions';
const settingsIcon: IIconProps = { iconName: "EditCreate" };

const stackfooterStyles: IStackStyles = {
  root: {
    backgroundColor: "#e2e2e2",
    height: 300,
  },
};

const buttonStyles: IButtonStyles = {
  root: {
    fontWeight: "lighter",
    border: "1px solid rgb(187, 187, 187)",
    borderRadius: "2px",
    margin: "8px",
    position: "absolute",
    marginLeft: "250px",
  },
};

const adminlabelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: {
    textAlign: "left",
    padding: "20px 20px 20px 20px",
  },
};

const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.white,
    height: 200,
    lineHeight: "50px",
    marginLeft: "20px",
    marginRight: "20px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)",
  },
};

const stackheaderStyles: IStackStyles = {
  root: {
    background: "#ffffff",
    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.19)",
  },
};

const section1Styles: IStackStyles = {
  root: {
    height: 50,
    borderBottom: "1px solid",
    borderBottomColor: "rgb(187, 187, 187)",
  },
};

const section2Styles: IStackStyles = {
  root: {
    height: 50,
    borderBottom: "1px solid",
    borderBottomColor: "rgb(187, 187, 187)",
  },
};

const sectionStackTokens: IStackTokens = { childrenGap: 30 };

const labelStyles: Partial<ILabelStyles> = {
  root: {
    margin: "10px 0",
    selectors: { "&:not(:first-child)": { marginTop: 24 } },
  },
};

export default class Admin extends React.Component {



  public _onBreadcrumbItemClicked(
    ev: React.MouseEvent<HTMLElement>,
    item: IBreadcrumbItem
  ): void {
    console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
  }

  public _getCustomDivider(dividerProps: IDividerAsProps): JSX.Element {
    const tooltipText = dividerProps.item ? dividerProps.item.text : "";
    return (
      <TooltipHost
        content={`Show ${tooltipText} contents`}
        calloutProps={{ gapSpace: 0 }}
      >
        <span aria-hidden="true" style={{ cursor: "pointer", padding: 5 }}>
          /
        </span>
      </TooltipHost>
    );
  }

  public _getCustomOverflowIcon(): JSX.Element {
    return <Icon iconName={"ChevronDown"} />;
  }

  public itemsWithHeading: IBreadcrumbItem[] = [
    { text: "Files", key: "Files", onClick: this._onBreadcrumbItemClicked, href: "#Admin"},
    { text: "Folder 1", key: "d1", onClick: this._onBreadcrumbItemClicked },
    { text: "Folder 2", key: "d2", isCurrentItem: true, href: "#Dashboard" },
  ];

  public render() {
    return (
      <>
        <div>
          {/* <Label styles={labelStyles}>With custom rendered divider and overflow icon</Label> */}
          {/* <Breadcrumb
            items={this.itemsWithHeading}
            maxDisplayedItems={5}
            ariaLabel="With custom rendered divider and overflow icon"
            dividerAs={this._getCustomDivider}
            onRenderOverflowIcon={this._getCustomOverflowIcon}
            overflowAriaLabel="More links"
          /> */}
          <p></p>
        </div> 
        
        <Stack styles={stackStyles}>
          <StackItem align="auto" styles={stackheaderStyles}>
          <div>
            <nav className="navbar navbar-light">
               <ul className="nav navbar-nav">
                  <li><Link to="/AdvancedOptions">ADVANCED OPTIONS</Link></li>
                  <li><Link to="/siteSettings">SITE SETTINGS</Link></li>
               </ul>
            </nav>
         </div>
          </StackItem>
        </Stack>
      </>
    );
  }
}

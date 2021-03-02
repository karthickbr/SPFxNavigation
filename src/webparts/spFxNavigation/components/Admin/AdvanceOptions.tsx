import * as React from "react";
import CustomNavigation from "./CustomNavigation";
import { NavLink, HashRouter, Switch, Link, Route } from "react-router-dom";
import {
  Breadcrumb,
  IBreadcrumbItem,
  IDividerAsProps,
} from "office-ui-fabric-react/lib/Breadcrumb";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import {
  Stack,
  StackItem,
  IStackStyles,
  DefaultButton,
  IIconProps,
  IButtonStyles,
  IStackTokens,
  DefaultPalette,
} from "office-ui-fabric-react";

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
export default class AdvanceOptions extends React.Component {
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
    {
      text: "Files",
      key: "Files",
      onClick: this._onBreadcrumbItemClicked,
      href: "#Admin",
    },
    { text: "Folder 1", key: "d1", onClick: this._onBreadcrumbItemClicked },
    { text: "Folder 2", key: "d2", isCurrentItem: true, href: "#Dashboard" },
  ];
  public render() {
    return (
      <>
        <div>
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
                  <li>
                    <Link to="/customNavigation">CUSTOM NAVIGATION</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </StackItem>
        </Stack>
      </>
    );
  }
}

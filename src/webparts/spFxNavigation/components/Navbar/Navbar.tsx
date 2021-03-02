import * as React from "react";
import { DefaultPalette } from "office-ui-fabric-react/lib/Styling";
import "../Navbar/Navbar.module.css";
import { IImageProps, ImageFit } from "office-ui-fabric-react/lib/Image";
import {
  Stack,
  StackItem,
  IStackStyles,
  IStackTokens,
} from "office-ui-fabric-react";
import "../Navbar/Navbar.module.css";
import { NavLink, Switch } from "react-router-dom";
import { ISpFxNavigationProps } from "../ISpFxNavigationProps";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

export interface ISPList {
  id: string;
  Title: string;
  NewTitle: string;
  order: string;
}

export interface ISPLists {
  value: ISPList[];
}

const logo: any = require("./Convergepoint1.png");

const menuStyles: IStackStyles = {
  root: {
    lineHeight: "60px",
    backgroundColor: DefaultPalette.white,
    color: "black",
  },
};

const sectionStackTokens: IStackTokens = { childrenGap: 20 };

export default class Navbar extends React.Component<ISpFxNavigationProps, {}> {
  constructor(props: any) {
    super(props);
    this._renderListAsync();
  }

  private _getListData(): Promise<ISPLists> {
    console.log("_getListData");
    return this.props.spHttpClient
      .get(
        this.props.siteUrl +
          `/_api/web/lists/GetByTitle('DynamicMenu')/Items?select=id,Title,NewTitle,order`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        debugger;
        return response.json();
      });
  }

  private _renderListAsync(): void {
    console.log("_renderListAsync");
    this._getListData().then((response) => {
      this._renderList(response.value);
    });
  }

  private _renderList(items: ISPList[]): void {
    console.log("items", items);
  }

  private updateMenu(item): void {
    let body: string = JSON.stringify({
      __metadata: { type: "SP.Data.InputsListItem" },
      IsMapped: true,
    });
    body = body.substring(1, body.length - 1);
    body = "{" + body + "}";
    this.props.spHttpClient
      .post(
        `${this.props.siteUrl}/_api/web/lists/getbytitle('DynamicMenu')/items(${item.Id})`, //  /items(1)
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "Content-type": "application/json;odata=verbose",
            "odata-version": "",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: body,
        }
      )
      .then(
        (response: SPHttpClientResponse): void => {
          console.log(response);
        },
        (error: any): void => {
          console.log(error);
        }
      );
  }

  public render(): React.ReactElement<ISpFxNavigationProps> {
    return (
      <div>
        <Stack horizontal wrap>
          <StackItem>
            {/* <Image
                        {...imageProps}
                        alt="logo"
                        width={150}
                        height={60} /> */}
            <div>
              <img src={logo} alt="logo" width="150" />
              {/* <img src={require('../../Convergepoint.png')} alt="logo" width={180} height={55} /> */}
            </div>
          </StackItem>
          <StackItem styles={menuStyles}>
            <Stack horizontal tokens={sectionStackTokens}>
              <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Dashboard"
                >
                  HOME
                </NavLink>
              </StackItem>

              <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Requests"
                >
                  REQUESTS
                </NavLink>
              </StackItem>

              <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/contracts"
                >
                  CONTRACTS
                </NavLink>
              </StackItem>

              <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Reports"
                >
                  REPORTS
                </NavLink>
              </StackItem>

              <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Admin"
                >
                  ADMINISTRATION
                </NavLink>
              </StackItem>

              <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/OtherLinks"
                >
                  OTHER LINKS
                </NavLink>
              </StackItem>
            </Stack>
          </StackItem>

          <Switch></Switch>
        </Stack>
      </div>
    );
  }
}

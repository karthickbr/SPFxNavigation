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
import { NavLink, Switch } from "react-router-dom";
import { ISpFxNavigationProps } from "../ISpFxNavigationProps";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { Nav, INavLinkGroup } from "office-ui-fabric-react/lib/Nav";

export interface ISPList {
  Id: string;
  Title: string;
  Value: string;
  order: string;
  IsDefault: string;
  canDelete: string;
  toLink: string;
}

export interface ISPLists {
  value: ISPList[];
}

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: "Parent link 2",
        url: "",
        target: "_blank",
        expandAriaLabel: "Expand Parent link 2",
        collapseAriaLabel: "Collapse Parent link 2",
        links: [
          {
            name: "Child link 4",
            url: "http://example.com",
            target: "_blank",
          },
        ],
      },
    ],
  },
];

const logo: any = require("./Convergepoint1.png");

const menuStyles: IStackStyles = {
  root: {
    lineHeight: "60px",
    backgroundColor: DefaultPalette.white,
    color: "black",
  },
};

const sectionStackTokens: IStackTokens = { childrenGap: 20 };
let navPosition;
export default class Navbar extends React.Component<ISpFxNavigationProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      Listvalue: [],
    };
    this._renderListAsync();
  }

  private _getListData(): Promise<ISPLists> {
    return this.props.spHttpClient
      .get(
        this.props.siteUrl +
          `/_api/web/lists/GetByTitle('DynamicMenu')/Items?select=id,Title,Value,order`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        // debugger;
        return response.json();
      });
  }

  private _renderListAsync(): void {
    this._getListData().then((response) => {
      this._renderList(response.value);
    });
  }

  private _renderList(items: ISPList[]): void {
    this.setState({
      Listvalue: items,
    });
    // navPosition = this.state.Listvalue.sort(
    //   (a, b) => Number(a.order) - Number(b.order)
    // );
  }

  public componentDidMount() {
    // window.addEventListener('storage', this.checkStorage)
    // this.state.Listvalue.map((x) =>
    //   x.id === this.state.Listvalue.id
    //     ? (x.position = +this.state.Listvalue.order)
    //     : ""
    // );
    // navPosition = this.state.Listvalue.sort(
    //   (a, b) => Number(a.order) - Number(b.order)
    // );
  }

  public componentWillUnmount() {
    // window.removeEventListener('storage', this.checkStorage)
  }

  private updateMenu(Id: any): void {
    let body: string = JSON.stringify({
      __metadata: { type: "SP.Data.DynamicMenu" },
      IsMapped: true,
    });
    body = body.substring(1, body.length - 1);
    body = "{" + body + "}";
    this.props.spHttpClient
      .post(
        `${this.props.siteUrl}/_api/web/lists/getbytitle('DynamicMenu')/items(${Id})`, //  /items(1)
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
              {/* <Navbar
                  appearance="subtle"
                  style={{ display: "flex", alignContent: "space-around" }}
                >
                  <Navbar.Body>
                    <Nav>
                      {navPosition.map((position, idx) => (
                        <Nav.Link key={idx} as={Link} to={position.toLink}>
                          {position.NewTitle}
                        </Nav.Link>
                      ))}
                    </Nav>
                  </Navbar.Body>
                </Navbar> */}

              <StackItem>
                {/* <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Dashboard"
                >
                  HOME
                </NavLink> */}
                {this.state.Listvalue.map((val: ISPList) => {
                  return (
                    <NavLink
                      exact
                      activeClassName="active_class"
                      className="nav_deco"
                      to={val.toLink}
                    >
                      {val.Value}
                    </NavLink>
                  );
                })}
              </StackItem>

              
                {/* <Nav ariaLabel="nested links" groups={navLinkGroups} /> */}
                <div  className="ml-0">
                  <div className="dropdown">
                    <NavLink className="dropbtn nav_deco" to="/Requests3">
                      OTHER LINKS
                      <i className="fa fa-caret-down"></i>
                    </NavLink>
                    <div className="dropdown-content">
                      <StackItem>
                        <NavLink
                          exact
                          activeClassName="active_class"
                          className="nav_deco"
                          to="/Requests1"
                        >
                          REQUESTS1
                        </NavLink>
                      </StackItem>
                      <StackItem>
                        <NavLink
                          exact
                          activeClassName="active_class"
                          className="nav_deco"
                          to="/Requests2"
                        >
                          REQUESTS2
                        </NavLink>
                      </StackItem>
                    </div>
                  </div>
                </div>
             

              {/* <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Requests"
                >
                  REQUESTS
                </NavLink>
              </StackItem> */}

              {/* <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/contracts"
                >
                  CONTRACTS
                </NavLink>
              </StackItem> */}

              {/* <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Reports"
                >
                  REPORTS
                </NavLink>
              </StackItem> */}

              {/* <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/Admin"
                >
                  ADMINISTRATION
                </NavLink>
              </StackItem> */}

              {/* <StackItem>
                <NavLink
                  exact
                  activeClassName="active_class"
                  className="nav_deco"
                  to="/OtherLinks"
                >
                  OTHER LINKS
                </NavLink>
              </StackItem> */}
            </Stack>
          </StackItem>

          <Switch></Switch>
        </Stack>
      </div>
    );
  }
}

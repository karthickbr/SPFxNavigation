import * as React from "react";
import { DefaultPalette } from "office-ui-fabric-react/lib/Styling";
import  "../Navbar/Navbar.module.css";
import { IImageProps, ImageFit } from "office-ui-fabric-react/lib/Image";
import {
  Stack,
  StackItem,
  IStackStyles,
  IStackTokens,
  Link,
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
  extLink: object;
}

export interface ISPLists {
  value: ISPList[];
}

// const navLinkGroups: INavLinkGroup[] = [
//   {
//     links: [
//       {
//         name: "Parent link 2",
//         url: "",
//         target: "_blank",
//         expandAriaLabel: "Expand Parent link 2",
//         collapseAriaLabel: "Collapse Parent link 2",
//         links: [
//           {
//             name: "Child link 4",
//             url: "http://example.com",
//             target: "_blank",
//           },
//         ],
//       },
//     ],
//   },
// ];

const logo: any = require("./Convergepoint1.png");

const menuStyles: IStackStyles = {
  root: {
    lineHeight: "60px",
    backgroundColor: DefaultPalette.white,
    color: "black",
  },
};

const sectionStackTokens: IStackTokens = { childrenGap: 25 };
let navPosition;
export default class Navbar extends React.Component<ISpFxNavigationProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      Listvalue: [],
      length: 0,
    };
    this._renderListAsync();
  }

  private _getListData(): Promise<ISPLists> {
    return this.props.spHttpClient
      .get(
        this.props.siteUrl +
          `/_api/web/lists/GetByTitle('DynamicMenu')/Items?select=id,Title,Value,order,extLink`,
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
      length: items.length,
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
    return <div>

<nav className="container navbar_default">
            <div style={{borderRight:"1px solid #d2d2d2"}}>
                <img className="logo_style" src="https://www.convergepoint.com/wp-content/uploads/2016/12/logo.png" />
            </div>
            <div>
                <ul className="navbar_menu">

                {this.state.Listvalue.slice(0, 5).map((val: ISPList) => {
                return (
                  <li>
                      <NavLink
                        exact
                        activeClassName="active_class"
                        
                        to={val.toLink}
                      >
                        {val.Value}
                      </NavLink>
                      </li>  
                );
              })}
                  
                    <li style={{position:"relative"}}>
                    <div className="dropdown">

                    <NavLink className="dropbtn" to="/">
                      OTHER LINKS
                      <i className="fa fa-caret-down"></i>
                    </NavLink>
                    <div className="dropdown-content">
                      {this.state.Listvalue.slice(5, this.state.length).map(
                        (val: ISPList) => {
                          return (
                            <div>
                              {/* <Link href={val.extLink} target="_blank" data-interception="off">{val.Value}</Link> */}
                              <a
                                href={val.extLink["Url"]}
                                target="_blank"
                                data-interception="off"
                              >
                                {val.extLink["Description"]}
                              </a>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
              
                  
                    </li>
                </ul>
            </div>
        </nav>



    </div>;
  }
}

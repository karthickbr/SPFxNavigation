import * as React from "react";
import {
  Stack,
  StackItem,
  IStackStyles,
  DefaultButton,
  IIconProps,
  IButtonStyles,
  IStackTokens,
  DefaultPalette,
  Label,
} from "office-ui-fabric-react";
import { ISpFxNavigationProps } from "../ISpFxNavigationProps";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  Modal,
  IDragOptions,
  IconButton,
} from 'office-ui-fabric-react';



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

export interface ISPList {
  Id: string;
  Title: string;
  NewTitle: string;
  order: string;
  IsDefault: string;
  canDelete: string;
  toLink: string;
}

export interface ISPLists {
  value: ISPList[];
}

export default class CustomNavigation extends React.Component<
  ISpFxNavigationProps,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      Listvalue: [],
    };
    this._renderListAsync();
  }

  //   public componentDidMount() {
  //     this._renderListAsync();
  //   }

  //   public componentWillUnmount() {
  //     this._renderListAsync();
  //   }

    private updateMenu(Id: any): any {
      let body: string = JSON.stringify({
        __metadata: { type: "SP.Data.DynamicMenu" },
        IsMapped: true,
        NewTitle: "sample",
        order: 6,
      });
      body = body.substring(1, body.length - 1);
      body = "{" + body + "}";
      this.props.spHttpClient
        .post(
          `${this.props.siteUrl}/_api/web/lists/getbytitle('DynamicMenu')/getItemById(1)`, //  /items(1)
          SPHttpClient.configurations.v1,
          {
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




//   private async updateMenu(Id: any): Promise<void> {
//     // you are getting back a collection here
//     const items: any[] = await sp.web.lists
//       .getByTitle("DynamicMenu")
//       .items.top(1)
//       .filter(`Id eq ${Id}`)
//       .get();

//     // see if we got something
//     if (items.length > 0) {
//       const updatedItem = await sp.web.lists
//         .getByTitle("DynamicMenu")
//         .items.getById(items[0].Id)
//         .update({
//           // NewTitle: "sample",
//           order: 6,
//         });

//       console.log(JSON.stringify(updatedItem));
//     }
//     return Promise.resolve();
//   }

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
    this._getListData().then((response) => {
      this._renderList(response.value);
    });
  }

  private _renderList(items: ISPList[]): void {
    this.setState({
      Listvalue: items,
    });
  }

  private handelEdit(id: any): any {
    console.log("handelEdit", id);
  }


  private async deleteMenu(id: any): Promise<void> {
    var option = window.confirm(`Are you sure want to Delete`);
    if(option){
    let list = sp.web.lists.getByTitle("DynamicMenu");
    await list.items.getById(id).delete().then(res => {
      window.location.reload(false);
    });
    }
  }

  public render(): React.ReactElement<ISpFxNavigationProps> {
    return (
      <>
        <div>
          <p></p>
        </div>
        <Stack styles={stackStyles}>
          <StackItem align="auto" styles={stackheaderStyles}>
            <div>
              <div>
                {this.state.Listvalue.map((val: ISPList) => {
                  return (
                    <p>
                      <span> {val.Title}</span>
                      <button
                        style={{ border: "none" }}
                        onClick={() => this.updateMenu(4)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ border: "none", margin: "0 10px" }}
                        onClick={() => this.deleteMenu(val.Id)}
                      >
                        Delete
                      </button>
                    </p>
                  );
                })}
              </div>
            </div>
          </StackItem>
        </Stack>
      </>
    );
  }
}

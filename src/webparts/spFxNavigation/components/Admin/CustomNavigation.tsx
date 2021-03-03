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
import { EditMenuModal } from "./EditMenuModal";
import * as ReactModal from "react-modal";

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
  Value: string;
  order: string;
  IsDefault: string;
  canDelete: string;
  toLink: string;
}

export interface ISPLists {
  value: ISPList[];
}
let subtitle;
export default class CustomNavigation extends React.Component<
  ISpFxNavigationProps,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      Listvalue: [],
      InputID: 1,
      styleDisplay: "none",
      input: "",
      open: false,
      previnput: "",
      showModal: false,
      setIsOpen: true,
    };
    this._renderListAsync();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //   public componentDidMount() {
  //     this._renderListAsync();
  //   }

  //   public componentWillUnmount() {
  //     this._renderListAsync();
  //   }

  private updateMenu1(Id: any): any {
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

  private _getListData(): Promise<ISPLists> {
    return this.props.spHttpClient
      .get(
        this.props.siteUrl +
          `/_api/web/lists/GetByTitle('DynamicMenu')/Items?select=Id,Title,Value,order`,
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
  }

  // private handelEdit(id: any): any {
  //   console.log("handelEdit", id);
  // }

  private async deleteMenu(id: any): Promise<void> {
    var option = window.confirm(`Are you sure want to Delete`);
    if (option) {
      let list = sp.web.lists.getByTitle("DynamicMenu");
      await list.items
        .getById(id)
        .delete()
        .then((res) => {
          window.location.reload(false);
        });
    }
  }

  private async updateMenu(id, title): Promise<void> {
    // console.log("index, title",id, title);
    let list = sp.web.lists.getByTitle("DynamicMenu");
    const i = await list.items
      .getById(id)
      .update({
        Value: title,
      })
      .then(() => {
        this.setState({
          input: "",
          styleDisplay: "none",
        });
        this.componentDidUpdate(this.state);
      });
      this.handleCloseModal();
    return Promise.resolve();
  }

  private async handleOpenModal(id) {
    // console.log('id',id);
    this.setState({
      InputID: +id,
      styleDisplay: "block",
      showModal: true,
    });

    const item = await sp.web.lists
      .getByTitle("DynamicMenu")
      .items.getById(id)
      .select("Value")
      .get();
    // console.log("item",item.Value);
    this.setState({
      input: item.Value,
    });
  }

  private handleCloseModal() {
    this.setState({ showModal: false });
  }

  public componentDidUpdate(_state) {
    // Typical usage (don't forget to compare props):
    if (this.state.input !== this.state.previnput) {
      this._renderListAsync();
      this.setState({
        previnput: this.state.input,
      });
    }
  }

  private handleEdit = async (id: any) => {
    // console.log('id',id);
    this.setState({
      InputID: +id,
      styleDisplay: "block",
    });
    const item = await sp.web.lists
      .getByTitle("DynamicMenu")
      .items.getById(id)
      .select("Value")
      .get();
    // console.log("item",item.Value);
    this.setState({
      input: item.Value,
    });
  }

  private setInput(e: any) {
    this.setState({
      input: e.target.value,
    });
  }

  private afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  private closeModal(){
    this.setState({
      setIsOpen: false,
    });
  }

  private customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

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
                    <>
                      <span> {val.Value}</span>{" "}
                      <button
                        style={{ border: "none" }}
                        onClick={() => this.handleOpenModal(val.Id)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ border: "none", margin: "0 10px" }}
                        onClick={() => this.deleteMenu(val.Id)}
                      >
                        Delete
                      </button>{" "}
                      <br />
                    </>
                  );
                })}

                <div>
                  <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Edit Modal"
                    style={this.customStyles}
                    // onAfterOpen={this.afterOpenModal}
                    // onRequestClose={this.closeModal}
                  >
                    <div>
                      <label htmlFor="Menu">Add Title</label>{' '}
                      <input
                        type="text"
                        id="Menu"
                        value={this.state.input}
                        onChange={(e) => this.setInput(e)}
                      />{" "}
                      {/* <label htmlFor="url">URL</label>
                      <input
                        type="text"
                        id="url"
                        value={this.state.input}
                        disabled
                      />{" "} */}
                      <button onClick={this.handleCloseModal}>CANCEL</button>
                      <button
                        onClick={() =>
                          this.updateMenu(this.state.InputID, this.state.input)
                        }
                      >
                        SAVE
                      </button>{" "}
                    </div>
                  </ReactModal>
                </div>

                {/* <div
                  className="modal-edit"
                  style={{ display: this.state.styleDisplay }}
                >
                  <input
                    type="text"
                    value={this.state.input}
                    onChange={(e) => this.setInput(e)}
                  />{" "}
                  <button
                    onClick={() =>
                      this.updateMenu(this.state.InputID, this.state.input)
                    }
                  >
                    SAVE
                  </button>{" "}
                  <br />
                </div> */}

              </div>
            </div>
          </StackItem>
        </Stack>
      </>
    );
  }
}

import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpFxNavigationProps {
  description: string;
  context: WebPartContext;
  spHttpClient: any;
  siteUrl: string;
  listName: string;
}

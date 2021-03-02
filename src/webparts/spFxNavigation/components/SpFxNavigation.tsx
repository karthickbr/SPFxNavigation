import * as React from 'react';
import styles from './SpFxNavigation.module.scss';
import { ISpFxNavigationProps } from './ISpFxNavigationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Stack, StackItem, IStackStyles, TextField, PrimaryButton, SemanticColorSlots, themeRulesStandardCreator } from 'office-ui-fabric-react';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
  NavLink
} from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Admin from './Admin/Admin';
import Dashboard from './Dashboard/Dashboard';
import Contracts from './Contracts/Contracts';
import OtherSites from './OtherSites/OtherSites';
import Reports from './Reports/Reports';
import Request from './Request/Request';
import AdvanceOptions from './Admin/AdvanceOptions';
import CustomNavigation from './Admin/CustomNavigation';



const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.white,
    height: 300,
  },
};

const stackheaderStyles: IStackStyles = {
  root: {
    background: DefaultPalette.white,
    height: 50,
    boxShadow: "0 10px 2px 0 rgba(0, 0, 0, 0.19)",
  },
};

const stackfooterStyles: IStackStyles = {
  root: {
    backgroundColor: "#e2e2e2" ,
    height: 300,
  },
};


export default class SpFxNavigation extends React.Component<ISpFxNavigationProps, {}> {
  public render(): React.ReactElement<ISpFxNavigationProps> {
    return (
      <HashRouter>
        <Stack styles={stackStyles}>
          <StackItem align="auto" styles={stackheaderStyles}>
            <Navbar {...this.props}/>
          </StackItem>
          <StackItem align="auto" styles={stackfooterStyles}>
          <Switch>
            <Route exact strict path='/' render={() => <Dashboard {...this.props} />} />
            <Route exact strict path='/Dashboard' render={() => <Dashboard {...this.props} />} />
            <Route exact path='/Requests' render={() => <Request {...this.props} />} />
            <Route exact strict path='/contracts' render={() => <Contracts {...this.props} />} />
            <Route exact path='/Reports' render={() => <Reports {...this.props} />} />
            <Route exact strict path='/Admin' render={() => <Admin {...this.props}/>}/>
            <Route exact path='/OtherLinks' render={() => <OtherSites {...this.props} />} />
            <Route exact path="/AdvancedOptions" component={AdvanceOptions}/>
            {/* <Route exact path="/CustomNavigation" component={CustomNavigation }/> */}
            <Route exact path="/CustomNavigation" render={() => <CustomNavigation {...this.props} />}/>
            <Route path="/siteSettings" />
        </Switch>
          </StackItem>
        </Stack>
      </HashRouter>
    );
  }
}

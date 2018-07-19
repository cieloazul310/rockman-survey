import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Tab,
  Nav,
  NavItem,
  NavDropdown,
  Navbar,
  MenuItem,
  Glyphicon,
  Badge
} from 'react-bootstrap';
import './DummyApp.css';

const navbarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: 50,
  width: '100%',
  margin: 0,
  padding: 0,
  zIndex: 100,
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(100, 100, 100, 0.4)'
};

const TabContents = [
  { eventKey: 1, title: 'Playlist', component: <h3>Playlist</h3> },
  { eventKey: 2.1, title: 'Programs', items: 28, component: <h3>Programs</h3> },
  { eventKey: 2.2, title: 'Artists', items: 170, component: <h3>Artists</h3> },
  { eventKey: 2.3, title: 'Countries', items: 10, component: <h3>Countries</h3> },
  { eventKey: 2.4, title: 'Corners', items: 5, component: <h3>Corners</h3> },
  { eventKey: 2.5, title: 'favs', items: 10, component: <h3>favs</h3> },
  { eventKey: 3, title: 'About', component: <h3>About</h3> }
];


const AppNavbar = () => (
  <div style={navbarStyle}>
    <Col xs={6} smHidden mdHidden lgHidden>
      <Nav justified>
        <NavItem eventKey={1} className="nav-larger">
          <Glyphicon glyph="music" /> Playlist
        </NavItem>
      </Nav>
    </Col>
    <Col xs={6} smHidden mdHidden lgHidden>
      <Nav justified>
        <NavDropdown eventKey={2} title={<span><Glyphicon glyph="menu-hamburger"/> Memu</span>} className="nav-larger">
          {TabContents.slice(1).map((content, i) => (
            <MenuItem key={i} eventKey={content.eventKey}>
              {content.title} <Badge>{content.items}</Badge>
            </MenuItem>
          ))}
        </NavDropdown>
      </Nav>
    </Col>
    <Col xsHidden smHidden md={3}>
      <Navbar.Header>
        <Navbar.Brand>
          <Glyphicon glyph="globe" /> ロック大陸測量部
        </Navbar.Brand>
      </Navbar.Header>
    </Col>
    <Col xsHidden sm={12} md={9}>
      <Nav justified>
        {TabContents.slice(1).map((content, i) => (
          <NavItem key={i} eventKey={content.eventKey} className="nav-larger">
            {content.title} <Badge>{content.items}</Badge>
          </NavItem>
        ))}
      </Nav>
    </Col>
  </div>
);

const TabPane = ({ eventKey, children }) => (
  <Tab.Pane eventKey={eventKey}>{children}</Tab.Pane>
);

const TabBundles = ({ contents }) => (
  <Tab.Content animation>
    {contents.map((content, i) => (
      <TabPane key={i} eventKey={content.eventKey}>
        {content.component}
      </TabPane>
    ))}
  </Tab.Content>
);

const TabsForMobile = () => <TabBundles contents={TabContents} />;

const TabsForLarge = () => (
  <TabBundles contents={TabContents.filter(d => d.title !== 'Playlist')} />
);

const AppContent = () => (
  <Row className="app-content" style={{ paddingTop: 50 }}>
    <Col xs={12} smHidden mdHidden lgHidden>
      <TabsForMobile />
    </Col>
    <Col xsHidden sm={8}>
      {TabContents[0].component}
    </Col>
    <Col xsHidden sm={4}>
      <TabsForLarge />
    </Col>
  </Row>
);

class DummyApp extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Tab.Container id="dummyTab" defaultActiveKey={2.1}>
        <div>
          <AppNavbar />
          <Grid>
            <AppContent />
          </Grid>
        </div>
      </Tab.Container>
    );
  }
}

export default DummyApp;

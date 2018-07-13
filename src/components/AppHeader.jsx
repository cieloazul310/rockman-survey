import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

const AppHeader = () => (
  <Navbar collapseOnSelect fixedTop style={{backgroundColor: '#fff', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.4)'}}>
    <Navbar.Header>
      <Navbar.Brand>
        <Glyphicon glyph="globe" /> ロック大陸測量部
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#programs">
          Programs
        </NavItem>
        <NavItem eventKey={2} href="#artists">
          Artists
        </NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="http://www.tfm.co.jp/manyuki/">
          番組HP
        </NavItem>
        <NavItem eventKey={2} href="https://www.youtube.com/playlist?list=PLGqFsFmePh4xxQjnjCpBLYsJY-VecUzdJ">
          YouTube再生リスト
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppHeader;

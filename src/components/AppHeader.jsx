import React from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Badge
} from 'react-bootstrap';

const AppHeader = ({ selected, favs, showFavs }) => (
  <Navbar
    collapseOnSelect
    fixedTop
    style={{
      backgroundColor: '#fff',
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.4)'
    }}
  >
    <Navbar.Header>
      <Navbar.Brand>
        <Glyphicon glyph="globe" /> ロック大陸測量部
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={6}>
          About
        </NavItem>
        <NavItem
          eventKey={5}
          onSelect={() => {
            showFavs();
          }}
          active={selected.key === 'favs'}
        >
          <Glyphicon
            glyph="star"
            style={{ color: selected.key === 'favs' ? 'gold' : 'silver' }}
          />favs <Badge>{favs.length}</Badge>
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1}>
          Programs <Badge>10</Badge>
        </NavItem>
        <NavItem
          eventKey={2}
        >
          Artists <Badge>10</Badge>
        </NavItem>
        <NavItem
          eventKey={3}
        >
          Countries <Badge>10</Badge>
        </NavItem>
        <NavItem
          eventKey={4}
        >
          Corner <Badge>10</Badge>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppHeader;

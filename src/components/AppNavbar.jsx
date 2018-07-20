import React from 'react';
import {
  Col,
  Nav,
  NavItem,
  Navbar,
  NavDropdown,
  Glyphicon,
  MenuItem,
  Badge
} from 'react-bootstrap';
import './AppNavbar.css';

const NavForMobile = ({ tributes, showFavs, state, playlistLength }) => (
  <div className="app-navbar">
    <Col xs={6} smHidden mdHidden lgHidden>
      <Nav justified>
        <NavItem eventKey={1} className="nav-larger">
          <Glyphicon glyph="music" /> Playlist <Badge>{playlistLength}</Badge>
        </NavItem>
      </Nav>
    </Col>
    <Col xs={6} smHidden mdHidden lgHidden>
      <Nav justified>
        <NavDropdown
          eventKey={2}
          title={
            <span>
              <Glyphicon glyph="menu-hamburger" /> Memu
            </span>
          }
          className="nav-larger"
        >
          <MenuItem eventKey={2.1}>
            {'Programs'} <Badge>{tributes.week.length}</Badge>
          </MenuItem>
          <MenuItem eventKey={2.2}>
            {'Artists'} <Badge>{tributes.artist.length}</Badge>
          </MenuItem>
          <MenuItem eventKey={2.3}>
            {'Countries'} <Badge>{tributes.nation.length}</Badge>
          </MenuItem>
          <MenuItem eventKey={2.4}>
            {'Corners'} <Badge>{tributes.corner.length}</Badge>
          </MenuItem>
          <MenuItem
            active={state.tab === 2.5}
            onClick={() => {
              showFavs();
            }}
          >
            <Glyphicon
              glyph="star"
              style={{ color: state.selected.key === 'favs' ? 'gold' : 'silver' }}
            />
            {' favs'} <Badge>{state.favs.length}</Badge>
          </MenuItem>
          <MenuItem eventKey={3}>{'About'}</MenuItem>
        </NavDropdown>
      </Nav>
    </Col>
  </div>
);

const NavForDesktop = ({ tributes, showFavs, state, playlistLength }) => (
  <div className="app-navbar">
    <Col xsHidden smHidden md={3}>
      <Navbar.Header>
        <Navbar.Brand>
          <Glyphicon glyph="globe" /> ロック大陸測量部
        </Navbar.Brand>
      </Navbar.Header>
    </Col>
    <Col xsHidden sm={12} md={9}>
      <Nav justified>
        <NavItem eventKey={3} className="nav-larger">
          {'About'}
        </NavItem>
        <NavItem eventKey={2.1} className="nav-larger">
          {'Programs'} <Badge>{tributes.week.length}</Badge>
        </NavItem>
        <NavItem eventKey={2.2} className="nav-larger">
          {'Artists'} <Badge>{tributes.artist.length}</Badge>
        </NavItem>
        <NavItem eventKey={2.3} className="nav-larger">
          {'Countries'} <Badge>{tributes.nation.length}</Badge>
        </NavItem>
        <NavItem eventKey={2.4} className="nav-larger">
          {'Corners'} <Badge>{tributes.corner.length}</Badge>
        </NavItem>
        <NavItem
          className="nav-larger"
          active={state.tab === 2.5}
          onClick={() => {
            showFavs();
          }}
        >
          <Glyphicon
            glyph="star"
            style={{ color: state.selected.key === 'favs' ? 'gold' : 'silver' }}
          />
          {' favs'} <Badge>{state.favs.length}</Badge>
        </NavItem>
      </Nav>
    </Col>
  </div>
);

const AppNavbar = props =>
  props.isMobile ? <NavForMobile {...props} /> : <NavForDesktop {...props} />;

export default AppNavbar;

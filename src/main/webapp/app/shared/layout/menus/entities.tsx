import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/amortization-entry">
      Amortization Entry
    </MenuItem>
    <MenuItem icon="asterisk" to="/prepayment-entry">
      Prepayment Entry
    </MenuItem>
    <MenuItem icon="asterisk" to="/prepayment-data">
      Prepayment Data
    </MenuItem>
    <MenuItem icon="asterisk" to="/preps-file-type">
      Preps File Type
    </MenuItem>
    <MenuItem icon="asterisk" to="/preps-file-upload">
      Preps File Upload
    </MenuItem>
    <MenuItem icon="asterisk" to="/preps-message-token">
      Preps Message Token
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

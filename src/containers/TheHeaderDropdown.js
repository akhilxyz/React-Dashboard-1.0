import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { useHistory } from "react-router";

import avatar from '../assets/img/avatar.jpg'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = (props) => {
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("Token")
    window.location.reload()
  }
  const Profile = () => {
     return history.push('/profile')
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={avatar}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem  onClick={Profile}>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem  onClick={logOut}>
          <CIcon name="cil-lock-locked" className="mfe-2"/>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown

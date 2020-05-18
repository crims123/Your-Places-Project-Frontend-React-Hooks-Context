import React from 'react';
import { CSSTransition } from 'react-transition-group';
import NavLinks from '../NavLinks';

const SideDrawer = ({ isOpen }) => {
  return (
    <React.Fragment>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <aside className="side-drawer">
          <NavLinks />
        </aside>
      </CSSTransition>
    </React.Fragment>
  );
};

export default SideDrawer;

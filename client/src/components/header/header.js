import React from "react";
import Navbar from "./navbar";

class Header extends React.Component {

  changeTheme = (e) => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    localStorage.theme === 'dark' ? localStorage.theme = 'light' : localStorage.theme = 'dark';
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    this.forceUpdate();
  }

  render() {
    return (
      <>
        <header className="mb-8">
          <Navbar state={this.props.state} changeTheme={this.changeTheme} theme={localStorage.theme}/>
        </header>
      </>
    );
  }
}

export default Header;

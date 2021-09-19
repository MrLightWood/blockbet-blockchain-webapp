import React, { Component } from "react";
import "./App.css";
import Webpages from "./pages";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { userConstants } from "./constants/user.constants";

class App extends Component {
  
  state = {
    dataFetched: false,
  }

  async componentDidMount() {
    if(!('theme' in localStorage)) {
      window.matchMedia('(prefers-color-scheme: dark)').matches ? localStorage.theme = 'dark' : localStorage.theme = 'white';
    }
    this.applyTheme();
    await this.props.userActions.getStatus();
  }

  applyTheme = () => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      if(this.props.user.type !== userConstants.LOGIN_REQUEST && this.props.user.type !== "") {
        this.setState({
          ...this.state,
          dataFetched: true,
        });
      }
    }
}

  render() {
    return (
      <>
        {
          this.state.dataFetched ? (
            <div className="flex flex-col h-screen justify-between mb-auto">
              <Header state={this.props} />
              <div className="container mx-auto w-full h-auto flex items-center justify-center">
                <Webpages state={this.props} />
              </div>
              <Footer state={this.props} />
            </div>
          ) : (<></>)
        }
      </>
    );
  }
}

export default App;

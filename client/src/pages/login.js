import React from "react";
import LoginForm from "../components/login/loginForm";
import SimpleReactValidator from "simple-react-validator";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({
      element: (message) => <div className="text-red-600">{message}</div>,
    });
  }
  state = {
    inputs: {
      email: "",
      password: "",
      rememberMe: false,
    },
    error: "",
  };

  componentDidUpdate(prevProps) {
    if(this.props.state !== prevProps.state){
        if(this.props.state.user.error.status === "Error" && this.props.state.user.error.message !== "Unauthorized") {
          this.setState({
            ...this.state,
            error: this.props.state.user.error.message,
          })
        }
    }
}

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateInput() === false) {
      return;
    }
    try {
      this.props.state.userActions.login(
        this.state.inputs.email,
        this.state.inputs.password,
        this.state.inputs.rememberMe
      );
    } catch (e) {
      this.setState({ ...this.state, error: e });
      return;
    }
    this.setState({ ...this.state, error: "" });
  };

  handleChange = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "email":
        this.setState({
          inputs: {
            ...this.state.inputs,
            email: e.target.value,
          },
        });
        break;
      case "password":
        this.setState({
          inputs: {
            ...this.state.inputs,
            password: e.target.value,
          },
        });
        break;
      case "remember-me":
        this.setState({
          inputs: {
            ...this.state.inputs,
            rememberMe: e.target.checked,
          },
        });
        break;
    }
  };

  validateInput = () => {
    if (this.validator.allValid()) {
      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
      return false;
    }
  };

  render() {
    return (
      <div className="container mx-auto flex items-center justify-center">
        <LoginForm
          user={this.props.state.user}
          inputs={this.state.inputs}
          error={this.state.error}
          handleChange={this.handleChange}
          validator={this.validator}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default LoginPage;

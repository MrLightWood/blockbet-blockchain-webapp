import React from "react";
import RegisterForm from "../components/login/registerForm";
import SimpleReactValidator from "simple-react-validator";

class RegisterPage extends React.Component {
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
      this.props.state.userActions.register(
        this.state.inputs.email,
        this.state.inputs.password,
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
        <RegisterForm
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

export default RegisterPage;

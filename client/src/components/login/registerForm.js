import React from "react";

class RegisterForm extends React.Component {
  render() {
    let errorElement;
    if (this.props.error !== "") {
      errorElement = (
        <div className="bg-red-400 p-4 text-white border-2 border-red-500 rounded-md">
          <span>{this.props.error}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="dark:text-gray-200 mx-auto h-12 w-auto text-center text-4xl font-bold">
                Welcome to BlockBet
            </h1>
            <h2 className="dark:text-gray-400 mt-2 text-center text-3xl font-extrabold text-gray-900">
              Register Your New Account
            </h2>
          </div>
          {errorElement}
          <form
            className="mt-8 space-y-6"
            onSubmit={this.props.handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <span>
                  {this.props.validator.message(
                    "Email field",
                    this.props.inputs.email,
                    "required|email"
                  )}
                </span>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="dark:bg-gray-800 dark:border-black dark:text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={this.props.handleChange}
                />
              </div>
              <div>
                {this.props.validator.message(
                  "Password field",
                  this.props.inputs.password,
                  "required|string"
                )}
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="dark:bg-gray-800 dark:border-black dark:text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={this.props.handleChange}
                />
              </div>
            </div>
            <div>
              <button
                disabled={this.props.user.registering ? true : false}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;

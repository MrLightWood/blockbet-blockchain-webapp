import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import SimpleReactValidator from "simple-react-validator";
import {blockbetService} from "../../services/blockbet.service"

export default class MyModal extends React.Component {
  constructor(props) {
    super(props);
        this.validator = new SimpleReactValidator({
        element: (message) => <div className="text-red-600">{message}</div>,
        });
    }
    state = {
        inputs: {
            optionOne: "",
            optionTwo: "",
        },
        error: "",
        isOpen: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.validateInput() === false) {return;}
        try {
          this.props.state.fetchActions.request();
          const data = await blockbetService.createBet(this.state.inputs.optionOne, this.state.inputs.optionTwo)
          if(data.status === "Success") {
            this.props.state.fetchActions.success();
            this.closeModal();
          } else {
            this.props.state.fetchActions.error();
          }
        } catch (e) {
          this.props.state.fetchActions.error();
          this.setState({ ...this.state, error: e });
          return;
        }
        this.setState({ ...this.state, error: "" });
      };

  closeModal = () => {
    this.setState({
        ...this.state,
        isOpen: false,
    })
  }

  openModal = () => {
    this.setState({
        ...this.state,
        isOpen: true,
    })
  }

  handleChange = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "optionOne":
        this.setState({
          ...this.state,
          inputs: {
            ...this.state.inputs,
            optionOne: e.target.value,
          },
        });
        break;
      case "optionTwo":
        this.setState({
          ...this.state,
          inputs: {
            ...this.state.inputs,
            optionTwo: e.target.value,
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
      this.forceUpdate();
      return false;
    }
  };

  render(){
    return (
        <>
        {/*<div className="fixed inset-0 flex items-center justify-center">*/}
        <div className="">
            <button
            type="button"
            onClick={this.openModal}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
            Create Bet
            </button>
        </div>

        <Transition appear show={this.state.isOpen} as={Fragment}>
            <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-75"
            onClose={this.closeModal}
            >
            <div className="min-h-screen px-4 text-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
                >
                &#8203;
                </span>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <div className="dark:bg-gray-700 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                    as="h3"
                    className="dark:text-white text-lg font-medium leading-6 text-gray-900"
                    >
                    Create your own Bet
                    </Dialog.Title>

                    <form
                        className="mt-8 space-y-6"
                        onSubmit={this.handleSubmit}
                    >
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <span>
                                {this.validator.message(
                                    "Option One field",
                                    this.state.inputs.optionOne,
                                    "required|alpha"
                                )}
                                </span>
                                <label htmlFor="optionOne" className="sr-only">
                                First option
                                </label>
                                <input
                                id="optionOne"
                                name="optionOne"
                                type="text"
                                autoComplete="email"
                                //required
                                className="dark:bg-gray-800 dark:border-black dark:text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="First option"
                                onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                {this.validator.message(
                                "Option two field",
                                this.state.inputs.optionTwo,
                                "required|alpha"
                                )}
                                <label htmlFor="optionTwo" className="sr-only">
                                Second option
                                </label>
                                <input
                                id="optionTwo"
                                name="optionTwo"
                                type="text"
                                autoComplete="current-password"
                                //required
                                className="dark:bg-gray-800 dark:border-black dark:text-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Second option"
                                onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={(this.props.state.user.loggedIn && !this.props.state.fetch.fetching) ? false : true}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                Create Bet
                            </button>
                        </div>
                    </form>

                    <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={this.closeModal}
                    >
                        Back
                    </button>
                    </div>
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
        </>
    );
  }
}
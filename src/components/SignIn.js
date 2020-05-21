import React from "react";
import Loading from "./Loading";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  changePass = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = () => {
    this.setState({ loading: true });
    fetch("https://face-smartapp.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.setState({ loading: false });

          this.props.changeRoute("home");
          this.props.updateUser(user);
        } else {
          this.setState({ loading: false });

          this.props.changeRoute("signIn");
        }
      });
  };

  render() {
    const { changeRoute } = this.props;
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.changeEmail}
                placeholder="test@test.com"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.changePass}
                placeholder="test"
              />
              <p className="f7">*para test usar placeholder</p>
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me{" "}
            </label>
          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <a
              href="#0"
              onClick={() => changeRoute("register")}
              className="f6 link dim black db"
            >
              Sign up
            </a>
            <a href="#0" className="f6 link dim black db">
              Forgot your password?
            </a>
            {this.state.loading === true ? <Loading /> : <div></div>}
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;

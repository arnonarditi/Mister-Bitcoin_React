import { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { userService } from './services/userService'
import { HomePage } from './pages/HomePage';
import { MainContacts } from './pages/MainConacts';
import { Charts } from "./pages/Charts"
import { AppHeader } from './components/AppHeader';

import './assets/scss/global.scss'

export class App extends Component {
  state = {
    user: null,
    showContacts: false,
  }

  componentDidMount() {
    this.updateUser()
  }

  updateUser = () => {
    this.setState({ user: userService.getUser() })
  }

  render() {
    const { user } = this.state
    return (
      <Router>
        <div className="main-app">
          <AppHeader />
          <main>
            <Switch>
              <Route path="/contact/:id" component={() => (<MainContacts user={user} updateUser={this.updateUser}/>)} />
              <Route path="/chart" component={Charts} />
              <Route path="/contact" component={() => (<MainContacts user={user} updateUser={this.updateUser}/>)}/>
              <Route path="/" component={() => (<HomePage user={user} updateUser={this.updateUser}/>)} />
            </Switch>
          </main>
          <footer>
            <section className="container">contactRights 2022 &copy;</section>
          </footer>
        </div>
      </Router>
    )
  }
}

export default App;

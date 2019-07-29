import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Layout from './ui/layout/Layout';
import Home from './screens/home/Home';
import Projects from './screens/projects/Projects';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Route path='/' exact component={Home} />
        <Route path='/projects' component={Projects} />
      </Layout>
    </Router>
  );
};

export default App;

var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Routes () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Login</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/todo'>Todo</NavLink>
      </li>
    </ul>
  )
}

module.exports = Routes; 
import React from 'react'
import { Link } from 'react-router-dom'

import { CartButton } from './index'
import logo from '../assets/img/pizza-logo.svg'

export const Header: React.FC = () => {
  return (
    <div className='header'>
      <div className='container'>
        <Link to='/'>
          <div className='header__logo'>
            <img width='38' src={logo} alt='Pizza logo' />
            <div>
              <h1>React Delivery Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <div className='header__cart'>
          <Link to='/cart'>
            <CartButton className='button--cart' />
          </Link>
        </div>
      </div>
    </div>
  )
}

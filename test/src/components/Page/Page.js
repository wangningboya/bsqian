import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Page.less'

export default class Page extends Component {
  render () {
    const { children } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}


Page.propTypes = {
  children: PropTypes.node,
}

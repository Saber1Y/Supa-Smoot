import React from 'react'
import { Link } from 'react-router-dom'

const SmoothyCard = ({ smoothie }) => {
  return (
    <div className='smoothie-card'>
      <h2>{smoothie.title}</h2>
      <p>{smoothie.method}</p>
      <div className='rating'>{smoothie.rating}</div>
      <button className="buttons">
        <Link to={'/' + smoothie.id}>
        <i className="material-icons">edit</i>
        </Link>
      </button>
    </div>
  )
}

export default SmoothyCard

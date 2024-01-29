import React from 'react'

const Client = ({username}) => {
  console.log('usernmae',username)
  return (
    <>
    <div className='client'>
        <span className='userName'>{username}</span>
    </div>
    </>
  )
}

export default Client
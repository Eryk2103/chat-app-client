import React from 'react'
import ChatRoom from './ChatRoom'
import ChatRoomsList from './ChatRoomsList'

export default function MainPage() {
  return (
    <div className='page'>
      <ChatRoomsList/>
      <ChatRoom/>
    </div>
  )
}

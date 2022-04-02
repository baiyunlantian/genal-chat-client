import React, { useEffect, useState } from 'react';
import { Drawer, Input, Menu, Dropdown, Avatar, Badge } from 'antd';
import { connect } from 'umi';
import { PlusCircleOutlined } from '@ant-design/icons';
import SearchChatModal from '@/pages/components/searchChatModal';
import Friend from '@/assets/friend.png';
import Group from '@/assets/group.png';
import styles from './index.less';

const MenuItems = [
  {key:'0', label:'创建群'},
  {key:'1', label:'搜索群'},
  {key:'2', label:'搜索用户'},
];

const ChatList = (props:any) => {
  const [{
    searchChatName,
    title,
    searchIconIsActive,
    showSearchChatModal,
    chatList,
    currentChat,
  }, setState] = useState({
    searchChatName:'',
    title:'0',
    currentChat:'',
    searchIconIsActive:false,
    showSearchChatModal:false,
    chatList:[
      {
        attr:Friend,
        unread:4,
        name:'yzh',
        msg:'123',
        id:'Friend'
      },
      {
        attr:Group,
        unread:0,
        name:'聊天组',
        msg:'222',
        id:'Group'
      }
    ]
  })

  const {app, dispatch} = props
  const chatListVisible = app.chatListVisible

  const handleClickAvatar = () => {
    dispatch({
      type:'app/changeBoolean',
      payload:{
        key:'chatListVisible',
        value:false
      },
    })
  };

  const handleClickMenuItem = ({ key }: {key:string}) => {
    setState(state=>({...state, title: key, searchIconIsActive: false}))
    handleVisibleModal(true)
  };

  const handleVisibleModal = (visible:boolean) => {
    setState(state=>({...state, showSearchChatModal: visible}))
  }

  const handleToggleChat = (chatId:string) => {
    setState(state=>({...state, currentChat: chatId}))
  }

  const MENU = (
     <Menu selectable onClick={handleClickMenuItem}>
      {
        MenuItems.map(item=>{
          return (
            <Menu.Item key={item.label}>
              {item.label}
            </Menu.Item>
          )
        })
      }
    </Menu>
  );

  return (
    <Drawer
      className={styles.chatListContainer}
      closable={false}
      placement={'left'}
      visible={chatListVisible}
      onClose={handleClickAvatar}
    >
      <div className={'search-input-container'}>
        <Input placeholder="搜索聊天组" value={searchChatName} onChange={e=>setState(state=>({...state, searchChatName: e.target.value}))}/>
        <Dropdown overlay={MENU} onVisibleChange={visible => setState(state=>({...state, searchIconIsActive: visible}))}>
          <PlusCircleOutlined className={`${searchIconIsActive ? 'isActive' : ''} commonIcon`}/>
        </Dropdown>
      </div>

      <div className='chart-list'>
        {chatList.map(item=>{
          return <Badge
            count={item.unread}
            className={`${currentChat === item.id ? 'bgcDynamic' : 'bgcNone'} chart-item`}
            key={item.id}
          >
            <Avatar src={item.attr} alt='*' className='chart-avatar' size={36} shape={'circle'}/>
            <div className={`item-content`} onClick={()=>handleToggleChat(item.id)}>
              <div>{item.name}</div>
              <div>{item.msg}</div>
            </div>
          </Badge>
        })}
      </div>

      <SearchChatModal
        title={title}
        visible={showSearchChatModal}
        handleVisibleModal={handleVisibleModal}
      />
    </Drawer>
  );
}

export default connect(({app}:{app:object})=>({app}))(ChatList)

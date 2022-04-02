import React, { useEffect, useState } from 'react';
import { Drawer, Input, Menu, Dropdown } from 'antd';
import { connect } from 'umi';
import { PlusCircleOutlined } from '@ant-design/icons';
import SearchChatModal from '@/pages/components/searchChatModal';
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
  }, setState] = useState({
    searchChatName:'',
    title:'0',
    searchIconIsActive:false,
    showSearchChatModal:false,
    chatList:[]
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
      <div>
        <Input placeholder="搜索聊天组" value={searchChatName} onChange={e=>setState(state=>({...state, searchChatName: e.target.value}))}/>
        <Dropdown overlay={MENU} onVisibleChange={visible => setState(state=>({...state, searchIconIsActive: visible}))}>
          <PlusCircleOutlined className={`${searchIconIsActive ? 'isActive' : ''} commonIcon`}/>
        </Dropdown>
      </div>

      <div className='chart-list'>

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

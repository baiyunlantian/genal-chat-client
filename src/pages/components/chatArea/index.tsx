import React, {useState} from 'react';
import { Avatar } from 'antd';
import Friend from '@/assets/friend.png';
import Group from '@/assets/group.png';
import styles from './index.less';

export default () => {
  const [messageList, setMessageList] = useState<Array<any>>([
    {
      attr:Friend,
      name:'接收方',
      msg:'receiver',
      id:'Friend',
      date:'3/15 16:16',
      type:'receiver',
    },
    {
      attr:Group,
      name:'发送方',
      msg:'sender',
      id:'sender',
      date:'3/15 16:16',
      type:'sender',
    },
    {
      attr:Group,
      name:'发送方',
      msg:'1',
      id:'441321',
      date:'3/15 16:16',
      type:'sender',
    },
    {
      attr:Group,
      name:'发送方',
      msg:'16542',
      id:'4522',
      date:'3/15 16:16',
      type:'sender',
    }
  ])

  return (
    <div className={styles.chatMsgList}>
      {messageList.map(item=>{
        return <div className={`${item.type === 'sender' ? styles.right : styles.left} ${styles.msgItem}`} key={item.id}>
          <div className={styles.userInfo}>
            <Avatar src={item.attr} alt='*' size={36} shape={'circle'}/>
            <div className={styles.name}>{item.name}</div>
            <div>{item.date}</div>
          </div>
          <div className={styles.msg}>{item.msg}</div>
        </div>
      })}
    </div>
  );
}

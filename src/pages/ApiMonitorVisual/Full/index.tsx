import fullIcon from '@/assets/Board/fullIcon.png';
import { Image } from 'antd';
import React, { useEffect } from 'react';
import boardModel from '../model';
import './index.less';
import { connect } from 'umi';

const Full = (props) => {
  const { app, dispatch } = props;
  const isFull = app.isFull;

  useEffect(() => {
    if (document.body.clientHeight > 3000) {
      const element = document.getElementById('-p-tieTa');
      element?.requestFullscreen();
      dispatch({
        type: 'app/setFullScreen',
        payload: {
          key: 'isFull',
          value: true,
        },
      });
    }
    // 适配北京现场 假的 5760*3240 真实的 宽 5743（没滚动条5760） * 高 1080（高度会拉长3倍）
    // if (
    //   document.body.clientHeight > 1000 &&
    //   document.body.clientHeight < 1100 &&
    //   document.body.clientWidth > 5700 &&
    //   document.body.clientHeight < 5800
    // ) {
    //   const element = document.getElementById('-p-tieTa');
    //   element?.requestFullscreen();
    //   boardModel.actions.update({
    //     isFull: true,
    //   });
    // }
  }, []);

  return (
    <div
      className="full"
      onClick={() => {
        dispatch({
          type: 'app/setFullScreen',
          payload: {
            key: 'isFull',
            value: true,
          },
        });
        if (!isFull) {
          const element = document.getElementById('-p-tieTa');
          if (element?.requestFullscreen) {
            element.requestFullscreen();
          }
        } else {
          document.exitFullscreen();
        }
      }}
    >
      {isFull ? (
        <div>
          <span>退出全屏</span>
        </div>
      ) : (
        <div>
          <Image src={fullIcon} preview={false} />
        </div>
      )}
    </div>
  );
};

export default connect(({ app }) => ({ app }))(Full);

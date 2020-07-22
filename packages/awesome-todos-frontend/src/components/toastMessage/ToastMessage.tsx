import React from 'react';
import './ToastMessage.css';

export enum MESSAGES_TYPES {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

interface Props {
  message: string;
  show: boolean;
  type?: MESSAGES_TYPES;
}

const getDynamicClassNames = ({ show, type = MESSAGES_TYPES.ERROR }: Props): string => {
  const classNames = [];
  if (show) {
    classNames.push('show');
  }
  classNames.push(`toast-${type ? type : 'error'}`);
  return classNames.join(' ');
};

const ToastMessage: React.FC<Props> = (props) => (
  <div className={`toast-container ${getDynamicClassNames(props)}`}>
    <span className="toast-text">{props.message}</span>
  </div>
);

export default ToastMessage;

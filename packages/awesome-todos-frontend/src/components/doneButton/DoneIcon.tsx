import * as React from 'react';

interface Props {
  className?: string;
}

const DoneIcon: React.FC<Props> = ({ className }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" className={className}>
    <path fill="white" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
  </svg>
);

export default DoneIcon;

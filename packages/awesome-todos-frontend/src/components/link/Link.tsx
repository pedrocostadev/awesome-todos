import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import './Link.css';

interface Props {
  to: string;
  label: string;
  className?: string;
}

const Link: React.FC<Props> = ({ to, label, className }) => {
  return (
    <ReactRouterLink className={className || 'link'} to={to}>
      {label}
    </ReactRouterLink>
  );
};

export default Link;

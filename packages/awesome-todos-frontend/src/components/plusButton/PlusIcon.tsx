import * as React from 'react';

interface Props {
  className?: string;
}

const PlusIcon: React.FC<Props> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" stroke="white" fill="white">
    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
  </svg>
);

export default PlusIcon;

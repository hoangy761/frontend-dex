import React from 'react';
type Props = {
  children?: React.ReactNode;
  className?: string;
};

function Box({ children, className }: Props) {
  return <div className={`bg-black rounded-md p-2 mt-1 mb-1 mr-1 ${className}`}>{children}</div>;
}

export default Box;

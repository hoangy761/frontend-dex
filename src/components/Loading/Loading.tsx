import React from 'react';
import { Loading03Icon } from 'hugeicons-react';
interface Props {
  className?: string;
}
const Loading: React.FC<Props> = ({ className }) => {
  return (
    <div className={`items-center flex justify-center h-full ${className}`}>
      <Loading03Icon className="animate-spin" />
    </div>
  );
};

export default Loading;

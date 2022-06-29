import React from 'react';

type TProps = {
  children: React.ReactNode;
  condition: boolean | undefined | null | number | string;
};

const When = ({ children, condition }: TProps) => {
  return <>{condition ? children : null}</>;
};

export default When;

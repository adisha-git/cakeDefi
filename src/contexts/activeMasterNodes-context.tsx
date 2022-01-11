import React, { useState, useEffect } from 'react';
import { useAxios } from '../utils/hooks';

export const ActiveMasterNodesContext = React.createContext({});

const ActiveMasterNodesProvider = (props: any) => {
  const [activeMasterNode, setActiveMasterNode] = useState<[] | null>([]);
  const result = useAxios(
    {
      url: 'https://api.cakedefi.com/nodes?order=status&orderBy=DESC',
      headers: {},
    },
    true
  );

  useEffect(() => {
    setActiveMasterNode(result?.response);
  }, [result]);

  return (
    <ActiveMasterNodesContext.Provider
      value={{
        activeMasterNode,
        setActiveMasterNode,
      }}
    >
      {props.children}
    </ActiveMasterNodesContext.Provider>
  );
};

export default ActiveMasterNodesProvider;

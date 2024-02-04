// App.tsx
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import HierarchyTree from './components/HierarchyTree';
import { transformData } from './components/data';
import { fetchData, useDataQuery } from './api/data';
import TreeView from './components/BasicTreeStructure';

const App: React.FC = () => {
  const { data, error, isLoading } = useDataQuery();

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Cloud Chef Hierarchy Tree</h1>
      <FileUpload />
      <>
        {data && data.data && data.data.length > 0 && 
        <div style={{ border: '2px solid ActiveBorder', padding: '10px' , borderRadius: "10px", marginBottom: "10px"}}>
    <h5 style={{textAlign: 'center'}}>Tree Structure</h5>
          <HierarchyTree members={transformData(data.data)} level={0} />
        </div>}
      </>
      {data && data.data && data.data.length > 0 &&  
      <div style={{ border: '2px solid ActiveBorder', padding: '10px' , borderRadius: "10px"}}><h5 style={{textAlign: 'center'}}>Flat Structure</h5>
        <TreeView data={data.data} parentName={null} level={0} />
      </div>
      }
    </div>
  );
};

export default App;
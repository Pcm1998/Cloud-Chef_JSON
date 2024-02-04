import React from 'react';
import TreeNode from './TreeNodeProps';

interface DataItem {
  name: string;
  parentName: string | null;
  childrenNames: string[];
}

interface HierarchyTreeProps {
  data: DataItem[];
  parentName: string | null;
  level: number
}

const HierarchyTree: React.FC<HierarchyTreeProps> = ({ data, parentName, level }) => {
  const filteredData = data.filter((item) => item.parentName === parentName);

  if (filteredData.length === 0) {
    return null;
  }

  return (
    <div style={{alignItems: "center"}}>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {filteredData.map((item) => (
        <li key={item.name}>
          <TreeNode name={item.name} level={level}>
            <HierarchyTree data={data} parentName={item.name} level={level + 1} />
          </TreeNode>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default HierarchyTree;

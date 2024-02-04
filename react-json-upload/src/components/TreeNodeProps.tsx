import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronCircleUp, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';


interface TreeNodeProps {
  name: string;
  children: React.ReactNode;
  level: number; // Add the level prop
}

const TreeNodeContainer = styled.div`
  margin-bottom: 8px;
  align-items: center;
`;

const TreeNodeHeader = styled.div<{ level: number }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 8px;
`;

const ToggleIcon = styled.span`
  margin-right: 5px;
`;

const TreeNodeContent = styled.div`
  margin-left: 20px;
  padding: 8px;
  border-left: 1px solid #ccc;
`;

const NameContainer = styled.span<{ level: number }>`
  display: inline-block;
  border: 1px solid #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${(props) => (props.level%2 === 0 ? 'lightblue' : 'lightgreen')}; // Customize colors based on the level

`;

const ExpandIcon = () => (
    <ToggleIcon>
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </ToggleIcon>
  );
  
  const CollapseIcon = () => (
    <ToggleIcon>
      <FontAwesomeIcon icon={faChevronCircleUp} />
    </ToggleIcon>
  );
  

const TreeNode: React.FC<TreeNodeProps> = ({ name, children, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TreeNodeContainer>
      <TreeNodeHeader level={level} onClick={handleToggle}>
      {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
        <NameContainer level={level}>{name}</NameContainer>
      </TreeNodeHeader>
      {isExpanded && <TreeNodeContent>{children}</TreeNodeContent>}
    </TreeNodeContainer>
  );
};

export default TreeNode;

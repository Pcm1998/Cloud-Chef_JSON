import React from "react";
import styled from "styled-components";
import Member from "./TreeNode"; // Assuming you have the Member component
import { Person } from "./data";
interface StyledWrapperProps {
    level?: number;
}

interface DataItem {
    name: string;
    parentName: string | null;
    childrenNames: string[];
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => `${props.level ? props.level * 30 : 0}px`};
`;

const hasChildren = (member: Person) => member.children && member.children.length > 0;

export function FamilyTree({ members, level = 0 }: { members: Person[], level: number }) {
  return (
    <>
      <StyledWrapper as="div" level={level}>
        {members.map((member, i) => (
          <div key={`level-${level}-${i}`} style={{ border: '1px solid ActiveBorder', padding: '12px' , borderRadius: "10px"}}>
            <Member {...member} />
            {hasChildren(member) && (
              <FamilyTree members={member.children} level={level + 1} />
            )}
          </div>
        ))}
      </StyledWrapper>
    </>
  );
};

export default FamilyTree;

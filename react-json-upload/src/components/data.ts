export interface Person {
    name: string;
    parentName: string;
    children: Person[];
  }

  interface DataItem {
    name: string;
    parentName: string | null;
    childrenNames: string[];
  }
  
export const transformData = (data: DataItem[]): Person[] => {
    const nodesMap: Record<string, Person> = {};
  
    data.forEach((item) => {
      const { name, parentName, childrenNames } = item;
  
      if (!nodesMap[name]) {
        nodesMap[name] = {
          name,
          parentName: "",
          children: [],
        };
      }
  
      nodesMap[name].parentName = parentName || "";
  
      childrenNames.forEach((childName) => {
        if (!nodesMap[childName]) {
          nodesMap[childName] = {
            name: childName,
            parentName: name,
            children: [],
          };
        }
  
        nodesMap[name].children.push(nodesMap[childName]);
      });
    });
  
    const rootNodes = Object.values(nodesMap).filter((node) => !node.parentName);
  
    return rootNodes;
  };
  
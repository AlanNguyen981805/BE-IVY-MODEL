import { CategoryAttributes } from "../models/category.model";
import { ICategory } from "../types/category.type";

export const buildTree = (
  categories: CategoryAttributes[],
  parentId: number | string | null = null,
  level = 1
) => {
  const tree: CategoryAttributes[] = [];
  categories
    .filter((category: CategoryAttributes) => category.parent_id === parentId)
    .forEach((category: CategoryAttributes) => {
      const node: CategoryAttributes = {
        id: category.id,
        name: category.name,
        link: category.link,
        isSale: category.isSale,
        parent_id: category.parent_id,
        slug: category.slug,
      };

      const children: any = buildTree(categories, category.id, level + 1);
      if (children.length > 0) {
        node.children = children;
      } else if (level === 2) {
        if (!tree.find((n: any) => n.leafNode)) {
          tree.push({ leafNode: [] } as any);
        }
        return tree.find((n: any) => n.leafNode)?.leafNode?.push(node);
      }
      tree.push(node);
    });

  return tree;
};

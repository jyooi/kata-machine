function searchNode(curr: BinaryNode<number>, needle: number): boolean {
    // define base case
    if (!curr) return false;

    if (curr.value === needle) return true;

    if (curr.value > needle && curr.left) {
        return searchNode(curr.left, needle);
    }

    if (curr.value < needle && curr.right) {
        return searchNode(curr.right, needle);
    }

    return false;
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return searchNode(head, needle);
}

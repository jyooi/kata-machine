function searchNode(curr: BinaryNode<number> | null, needle: number): boolean {
    // define base case

    // base case
    if (!curr) return false;

    if (curr.value === needle) return true;

    // base case

    //recursion

    //pre
    // recurse
    //post
    if (curr.value < needle) {
        return searchNode(curr.right, needle);
    }

    if (curr.value > needle) {
        return searchNode(curr.left, needle);
    }

    return false;
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return searchNode(head, needle);
}

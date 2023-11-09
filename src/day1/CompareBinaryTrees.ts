function compareBinaryTree(
    binaryA: BinaryNode<number> | null,
    binaryB: BinaryNode<number> | null,
): boolean {
    // define base case
    // check both subtree are null , means structurlly we are the same
    if (binaryA === null && binaryB === null) return true;

    // check if either one of the substree are null

    if (binaryA === null || binaryB === null) return false;

    // value check
    if (binaryA.value !== binaryB.value) return false;

    // 3 steps of recursion

    // pre
    // recurse
    // post

    return (
        compareBinaryTree(binaryA.left, binaryB.left) &&
        compareBinaryTree(binaryA.right, binaryB.right)
    );
}

export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    return compareBinaryTree(a, b);
}

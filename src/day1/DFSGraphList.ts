function walk(
    graph: WeightedAdjacencyList,
    curr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // base cases

    if (seen[curr]) return false;

    seen[curr] = true;

    // recursion step

    // pre
    path.push(curr);
    if (curr === needle) {
        return true;
    }

    // recurse
    const list = graph[curr];
    for (let i = 0; i < list.length; ++i) {
        const edge = list[i];

        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    //post
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = [];

    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    if (path.length) return path;

    return null;
}

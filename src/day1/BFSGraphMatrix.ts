export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false); // as we dont seen any node yet so fill all false

    const prev = new Array(graph.length).fill(-1); // this is the array to recrod down those path have go thru , for backward waling back thru poping out

    seen[source] = true; // set the first item in q as seen

    const q: number[] = [source]; // set the initial item in q

    do {
        const curr = q.shift() as number; // deque one item as list it curr

        // where curr = needle

        if (curr === needle) break; // break the loop if we found the needle

        // if we havent found it do some bookeeping
        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; ++i) {
            if (adjs[i] === 0) continue;

            if (seen[i] === true) continue;

            seen[i] = true;
            prev[i] = curr;

            q.push(i);
        }

        seen[curr] = true;
    } while (q.length);

    // build it backwards

    let curr = needle;

    const out: number[] = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    if (out.length > 0) {
        return [source].concat(out.reverse());
    }

    return null;
}

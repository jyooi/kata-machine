type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return { value };
}

export default class LRU<K, V> {
    private length: number;

    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;

    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // use get() method to check the existence
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
        //if it does't we need to insert
        // - check capacity and evict it over

        // - if it does we need need to update to the front of the list
    }
    get(key: K): V | undefined {
        // check the cache for existence
        const node = this.lookup.get(key);

        if (!node) return undefined;

        // update the value we found and move it to the front
        this.detach(node);
        this.prepend(node);

        // return out the value found or undefined if not exits
        return node.value;
    }

    private detach(node: Node<V>): void {
        // remove from link list
        // link current node prev node next pointer to you current node next pointer
        if (node.prev) {
            node.prev.next = node.next;
        }

        // link current node next node prev pointer to you current node prev pointer
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.length === 1) {
            this.head = this.tail = undefined;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        // break the current node link
        node.next = undefined;
        node.prev = undefined;
    }
    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }
    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        let tail = this.tail as Node<V>;

        this.detach(this.tail as Node<V>);

        const key = this.reverseLookup.get(tail) as K;

        this.lookup.delete(key);

        this.reverseLookup.delete(tail);

        this.length--;
    }
}

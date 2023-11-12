export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.headpifyUp(this.length);
        this.length++;
    }
    delete(): number {
        const out = this.data[0];
        this.length--;
        
        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return out;
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }
    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }
    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }

    private headpifyUp(idx: number): void {
        if (idx === 0) return;

        const p = this.parent(idx);
        const parentV = this.data[p];
        const v = this.data[idx];

        if (parentV > v) {
            // for min heap the larger value will stay on top
            this.data[idx] = parentV;
            this.data[p] = v;
            this.headpifyUp(p);
        }
    }

    private heapifyDown(idx: number): void {
        const v = this.data[idx];

        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];

        if (idx >= this.length || lIdx >= this.length) return;

        if (lV > rV && v > rV) {
            this.data[idx] = rV;
            this.data[rIdx] = v;
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            this.data[idx] = lV;
            this.data[lIdx] = v;
            this.heapifyDown(lIdx);
        }
    }
}

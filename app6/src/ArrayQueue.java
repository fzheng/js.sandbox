public class ArrayQueue {
    private int capacity;
    private int[] arr;
    private int head;
    private int tail;
    private int sizeOfQueue;

    public ArrayQueue(int n) {
        capacity = n;
        arr = new int[n];
        head = 0;
        tail = 0;
        sizeOfQueue = 0;
    }

    public void add(int item) throws Exception {
        if (sizeOfQueue == capacity) {
            throw new Exception("queue is full");
        }
        if (tail == capacity) {
            tail = 0;
        }
        sizeOfQueue++;
        arr[tail++] = item;
    }

    public int poll() throws Exception {
        if (sizeOfQueue == 0) {
            throw new Exception("queue is empty");
        }
        int x = arr[head];
        head++;
        if (head == capacity) {
            head = 0;
        }
        sizeOfQueue--;
        return x;
    }

    public int peek() throws Exception {
        if (sizeOfQueue <= 0) {
            throw new Exception("queue is empty");
        }
        return arr[head];
    }

    public static void main(String[] args) throws Exception {
        ArrayQueue arrayQueue = new ArrayQueue(2);
        arrayQueue.add(1);
        arrayQueue.add(2);
        System.out.println(arrayQueue.poll());
        System.out.println(arrayQueue.peek());
        arrayQueue.add(3);
        System.out.println(arrayQueue.poll());
        System.out.println(arrayQueue.poll());
    }
}

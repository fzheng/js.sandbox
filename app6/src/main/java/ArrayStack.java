public class ArrayStack {
    private int capacity;
    private int[] arr;
    private int index;

    public ArrayStack(int n) {
        capacity = n;
        arr = new int[n];
        index = 0;
    }

    public void push(int item) throws Exception {
        if (index == capacity) {
            throw new Exception("stack is full");
        }
        arr[index++] = item;
    }

    public int pop() throws Exception {
        if (isEmpty()) {
            throw new Exception("stack is empty");
        }
        return arr[--index];
    }

    public int peek() throws Exception {
        if (isEmpty()) {
            throw new Exception("stack is empty");
        }
        return arr[index - 1];
    }

    public boolean isEmpty() {
        return index == 0;
    }

    public static void main(String[] args) throws Exception {
        ArrayStack arrayStack = new ArrayStack(10);
        arrayStack.push(1);
        arrayStack.push(2);
        System.out.println(arrayStack.pop());
        System.out.println(arrayStack.peek());
        System.out.println(arrayStack.isEmpty());
        arrayStack.push(3);
        System.out.println(arrayStack.pop());
        System.out.println(arrayStack.pop());
        System.out.println(arrayStack.isEmpty());
    }
}
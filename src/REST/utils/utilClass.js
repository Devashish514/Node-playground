const { likeBlog } = require("../controllers/likes");

// const LikeNode = require("../models/likes");

class LikeNode {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class Likes {
    constructor() {
        this.head = new LikeNode('head');
    }
    findLikes(item) {
        let currentNode = this.head;
        while (currentNode.element !== item) {
            if (!currentNode.next instanceof LikeNode) {
                return { status: false, data: null };
            }
            currentNode = currentNode.next;
        }
        return { status: true, data: currentNode };
    }
    findPrevious(item) {   // generally used for remove
        let currentNode = this.head;
        while (currentNode.next !== null && currentNode.next.element !== item) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
    insertLikes(item) {
        let newNode = new LikeNode(item);
        let lastNode = this.findPrevious('head');
        if (lastNode instanceof LikeNode) {
            newNode.next = lastNode.next;
            lastNode.next = newNode;
        }
    }
    removeLike(item) {
        let previousNode = this.findPrevious(item);
        previousNode.next = previousNode.next.next;
    }
    createList() {
        let currentNode = this.head;
        const arr = [];
        while (currentNode.next !== null) {
            arr.push(currentNode.next.element);
        }
        return arr;
    }

}

module.exports = Likes;

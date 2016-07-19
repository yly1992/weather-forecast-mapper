import {observable, computed} from 'mobx';

/**
 * Returns successive items from a collection of items via `nextItem`
 * starting at index 0, and looping back to the beginning at the end.
 */
export default class ArrayLooper<T> {
  @observable currentIndex: number;
  @computed get currentItem(): T {
    return this.items[this.currentIndex];
  }

  constructor(public items: T[]) {
    this.currentIndex = items.length; // force the first item to be the next one up
  }

  getNextItem(): T {
    this.currentIndex = getNextIndex(this.items, this.currentIndex);
    return this.items[this.currentIndex];
  }
}

function getNextIndex(items: any[], currentIndex: number): number {
  return currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
}
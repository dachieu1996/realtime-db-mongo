import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserRightService {
  private listRight: string[] = [];
  constructor() {}
  add(right: string) {
    this.listRight.push(right);
  }
  check(right: string): boolean {
    return this.listRight.indexOf(right) > -1;
  }
  getAll(): string[] {
    return this.listRight;
  }
  deleteAll() {
    this.listRight = [];
    return true;
  }
}

export interface User {
  id: string,
  username: string,
  fullname: string,
  avatarUrl: string,
  currentRoom: string,
  device: string,
  status: UserStatus,
  lastModifiedOnDate: Date,
  createdOnDate: Date
}

export enum UserStatus {
  OFFLINE,
  ONLINE,
  BUSY
}

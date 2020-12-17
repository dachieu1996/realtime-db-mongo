export interface User {
  id: string,
  username: string,
  fullname: string,
  avatarUrl: string,
  currentRoom: string,
  device: string,
  status: UserStatus
}

export enum UserStatus {
  OFFLINE,
  ONLINE,
  BUSY
}

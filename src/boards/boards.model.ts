export interface Board {
  id: string;
  title: string;
  description: string;
  boardStatus: BoardStatus;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

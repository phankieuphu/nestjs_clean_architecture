export interface IPaginationMeta {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  total?: number;
}

export interface IResponse<T = any> {
  status_code?: number;
  message?: string;
  data?: T;
  meta?: IPaginationMeta;
}

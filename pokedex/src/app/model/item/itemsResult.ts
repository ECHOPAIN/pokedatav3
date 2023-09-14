export interface ItemsResult {
  count: number,
  next: any,
  previous: any,
  results : Items[]
}

export interface Items {
  name: string ,url: string
}

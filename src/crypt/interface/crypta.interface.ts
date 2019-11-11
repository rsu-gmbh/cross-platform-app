export interface CryptaContainer {
  nextItemId: number,
  id: number,
  title: string,
  description?: string,
  hash: string,
  items: number[],
  itemMap: CryptItemMap,
  pw?: string,
  locked: boolean
}

export interface Crypta {
  nextContainerId: number,
  containers: number[],
  containerMap: CryptContainerMap,
}

export interface CryptContainerMap {
  [id: number]: CryptaContainer
}

export interface CryptItemMap {
  [id: number]: CryptItem
}

export interface CryptItem {
  id: number,
  title: string,
  secret: string,
  locked: boolean
}

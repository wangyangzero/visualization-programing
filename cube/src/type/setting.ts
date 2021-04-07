export interface IComponent {
  componentId: number;
  componentKey: string;
  pos: number;
  pageKey: string;
}

export interface IObject {
  [propName: string]: any;
}
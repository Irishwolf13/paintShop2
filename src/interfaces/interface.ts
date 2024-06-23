export interface Painter { id: number, name: string }
export interface Note { id: number, note: string, title:string }
export interface PaintColor { id: number; color: string; line: string; brand: string; type: string; finish: string; orderForm: string }

export interface Job {
  id?: string;
  name?: string;
  number?: number;
  date?: string;
  painters?: Painter[];
  notes?: Note[];
  paintColors?: PaintColor[]
}
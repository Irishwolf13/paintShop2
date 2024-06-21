export interface Painter { id: number, name: string }
export interface Note { id: number, note: string, title:string }
export interface PaintColor { id: number; name: string; pantone: string; brand: string; type: string; finish: string }

export interface Job {
  name?: string;
  number?: number;
  date?: string;
  painters?: Painter[];
  notes?: Note[];
  paintColors?: PaintColor[]
}
import { ThemePalette } from '@angular/material/core';

export interface MatDialogButton<T> {
  buttonLibelle: string;
  buttonColor?: ThemePalette;
  buttonResult?: T;
  isButtonFocusInitial?: true;
}

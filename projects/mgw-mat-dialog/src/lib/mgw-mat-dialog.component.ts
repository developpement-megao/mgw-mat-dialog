import { KeyValue, KeyValuePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatDialogButton } from './models/mat-dialog-button';
import { MatInputField } from './models/mat-input-field';

export type DialogButtonsData<T> = ReadonlyArray<MatDialogButton<T> | string>;

export type InputFieldsList = ReadonlyMap<string, MatInputField>;

export interface DialogButtonConfig<T> {
  dialTitre: string;
  /** Paramétrage des boutons avec buttonLibelle, buttonsColor et buttonResult */
  dialButtons: DialogButtonsData<T>;
  inputFields?: InputFieldsList;
}

/**
 * Type de dialog avec boutons prédéfinis :
 * * YesNo : Boutons Non et Oui
 * * YesNoCancel : Boutons Annuler, Non et Oui
 * * Ok : Bouton Ok
 * * OkNo : Boutons Non et Ok
 * * OkCancel : Boutons Annuler et Ok
 * * ValidCancel : Bouton Annuler et Valider
 */
export type DialogButtonType = 'YesNo' | 'YesNoCancel' | 'Ok' | 'OkNo' | 'OkCancel' | 'ValidCancel';

/**
 * Résultats possibles sur boutons prédéfinis :
 * * true : si Ok ou Oui
 * * false : si non
 * * null : si Cancel
 */
export type DialogButtonTypeResult = boolean | null;

export interface DialogResultatValues<T> {
  resultat: T;
  inputFields: InputFieldsList | null;
}

export interface MgwMatDialogData<T = unknown> extends Partial<DialogButtonConfig<T>> {
  dialTexte?: string;
  dialActionButtonsAlignment?: 'start' | 'center' | 'end' | undefined;
  /**
   * * YesNo : Boutons Non et Oui
   * * YesNoCancel : Boutons Annuler, Non et Oui
   * * Ok : Bouton Ok
   * * OkNo : Boutons Non et Ok
   * * OkCancel : Boutons Annuler et Ok
   * * ValidCancel : Bouton Annuler et Valider avec un input field
   */
  dialButtonsType?: DialogButtonType;
}

export type MgwMatDialogResult<T = unknown> = DialogResultatValues<T | undefined> | T;

const DIAL_TITRE_DEF = 'Information';

const DIAL_BUTTONS_FROM_TYPE: ReadonlyMap<DialogButtonType, DialogButtonConfig<DialogButtonTypeResult>> = new Map<
  DialogButtonType,
  DialogButtonConfig<DialogButtonTypeResult>
>([
  [
    'YesNo',
    {
      dialTitre: 'Confirmation',
      dialButtons: [
        { buttonLibelle: 'Non', buttonResult: false },
        { buttonLibelle: 'Oui', buttonResult: true }
      ]
    }
  ],
  [
    'YesNoCancel',
    {
      dialTitre: 'Confirmation',
      dialButtons: [
        { buttonLibelle: 'Annuler', buttonResult: null },
        { buttonLibelle: 'Non', buttonResult: false },
        { buttonLibelle: 'Oui', buttonResult: true }
      ]
    }
  ],
  ['Ok', { dialTitre: DIAL_TITRE_DEF, dialButtons: [{ buttonLibelle: 'Ok', buttonResult: true }] }],
  [
    'OkNo',
    {
      dialTitre: 'Continuer',
      dialButtons: [
        { buttonLibelle: 'Non', buttonResult: false },
        { buttonLibelle: 'Ok', buttonResult: true }
      ]
    }
  ],
  [
    'OkCancel',
    {
      dialTitre: 'Continuer',
      dialButtons: [
        { buttonLibelle: 'Annuler', buttonResult: null },
        { buttonLibelle: 'Ok', buttonResult: true }
      ]
    }
  ],
  [
    'ValidCancel',
    {
      dialTitre: '',
      dialButtons: [
        { buttonLibelle: 'Annuler', buttonResult: null },
        { buttonLibelle: 'Valider', buttonResult: true }
      ],
      inputFields: new Map<string, MatInputField>([['Valeur', { inputFieldLabel: '', inputFieldValue: '' }]])
    }
  ]
]);

@Component({
  selector: 'lib-mgw-mat-dialog',
  templateUrl: './mgw-mat-dialog.component.html',
  styleUrls: ['./mgw-mat-dialog.component.scss'],
  imports: [NgIf, NgFor, NgStyle, KeyValuePipe, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  standalone: true
})
export class MgwMatDialogComponent<T = unknown> {
  readonly dialTitreDef = DIAL_TITRE_DEF;

  readonly iptfldErrMessRequiredDef = 'Vous devez saisir une valeur';

  readonly iptfldTypeDef = 'text';

  readonly affDialTitre: boolean;

  readonly dialTitre: string | null;

  readonly dialButtons: ReadonlyArray<MatDialogButton<T | DialogButtonTypeResult>> | null;

  readonly inputFields: ReadonlyMap<string, MatInputField> | null;

  constructor(
    public dialogRef: MatDialogRef<MgwMatDialogComponent, MgwMatDialogResult<T | DialogButtonTypeResult>>,
    @Inject(MAT_DIALOG_DATA) public data: MgwMatDialogData<T> | null | undefined
  ) {
    // on prend le titre passé au dialogue ou le titre passé par le type de dialogue prédéfini
    this.dialTitre = data?.dialTitre ?? (data?.dialButtonsType ? DIAL_BUTTONS_FROM_TYPE.get(data.dialButtonsType)?.dialTitre || null : null);

    // on prend le ou les champs (formulaire) de saisie passé(s) au dialogue ou passé(s) par le type de dialogue prédéfini
    this.inputFields = data?.inputFields ?? (data?.dialButtonsType ? DIAL_BUTTONS_FROM_TYPE.get(data.dialButtonsType)?.inputFields ?? null : null);

    // on affiche le titre du dialogue si le titre est défini ou si on n'a pas de texte et pas de formulaire
    this.affDialTitre = Boolean(this.dialTitre || (!data?.dialTexte && !this.inputFields));

    // récupération du ou des boutons passé(s) au dialogue ou passé(s) par le type de dialogue prédéfini
    const dialButtonsData: DialogButtonsData<T | DialogButtonTypeResult> | undefined =
      data?.dialButtons ?? (data?.dialButtonsType ? DIAL_BUTTONS_FROM_TYPE.get(data.dialButtonsType)?.dialButtons : undefined);
    this.dialButtons =
      dialButtonsData?.map((bt) => {
        const btResult: MatDialogButton<T | DialogButtonTypeResult> = typeof bt === 'string' ? { buttonLibelle: bt } : bt;
        return btResult;
      }) ?? null;
  }

  onButtonClick(btResult: T | DialogButtonTypeResult | undefined): void {
    if (this.inputFields) {
      this.dialogRef.close({
        resultat: btResult,
        inputFields: this.inputFields
      });
    } else {
      this.dialogRef.close(btResult);
    }
  }

  compareKeyValueIptfld(): number {
    return 0;
  }

  trackByDialButtonsFn(index: number, item: MatDialogButton<T | DialogButtonTypeResult>): string | number {
    return item.buttonLibelle || index;
  }

  trackByInputFieldsFn(index: number, item: KeyValue<string, MatInputField>): string | number {
    return item.key || index;
  }
}

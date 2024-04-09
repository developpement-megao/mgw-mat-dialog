import { KeyValue, KeyValuePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ThemePalette } from '@angular/material/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type AutocapitalizeValues = 'none' | 'off' | 'sentences' | 'on' | 'words' | 'characters';

export type BooleanInputTrueFalse = 'true' | 'false' | '1' | boolean | null | undefined;

export type InputFieldTypes = 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';

export type InputFieldAutocomplete =
  | 'off'
  | 'on'
  | 'name'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'shipping'
  | 'shipping street-address'
  | 'shipping address-level2'
  | 'billing'
  | 'billing street-address'
  | 'billing address-level2'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo'
  | 'webauthn';

export interface MatInputField {
  texteIntroduction?: string;
  formFieldColorTheme?: ThemePalette;
  formFieldStyle?: { [klass: string]: unknown };
  inputFieldLabel?: string;
  inputFieldPlaceholder?: string;
  inputFieldType?: InputFieldTypes;
  inputFieldAutocomplete?: InputFieldAutocomplete;
  inputFieldPrefixText?: string;
  inputFieldPrefixIcon?: string;
  inputFieldSuffixText?: string;
  inputFieldSuffixIcon?: string;
  inputFieldHintStart?: string;
  inputFieldHintEnd?: string;
  inputFieldRequired?: BooleanInputTrueFalse;
  hideRequiredMarker?: BooleanInputTrueFalse;
  inputFieldErrorMessage?: string;
  inputFieldReadonly?: BooleanInputTrueFalse;
  inputFieldDisabled?: BooleanInputTrueFalse;
  inputFieldAutocapitalize?: AutocapitalizeValues;
  inputFieldValue: string;
}

export interface MatDialogButton<T> {
  buttonLibelle: string;
  buttonColor?: ThemePalette;
  buttonResult?: T;
  isButtonFocusInitial?: true;
}

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
  template: `
    <h1 mat-dialog-title *ngIf="affDialTitre">{{ dialTitre || dialTitreDef }}</h1>
    <div mat-dialog-content *ngIf="data?.dialTexte || inputFields">
      <p *ngIf="data?.dialTexte as dlgText">{{ dlgText }}</p>
      <ng-container *ngIf="inputFields">
        <div *ngFor="let iptfld of inputFields | keyvalue: compareKeyValueIptfld; trackBy: trackByInputFieldsFn" class="cont-form-field-input">
          <p *ngIf="iptfld.value.texteIntroduction as texteIntro">{{ texteIntro }}</p>
          <mat-form-field [ngStyle]="iptfld.value.formFieldStyle" [color]="iptfld.value.formFieldColorTheme" [hideRequiredMarker]="iptfld.value.hideRequiredMarker">
            <mat-label *ngIf="iptfld.value.inputFieldLabel !== ''">{{ iptfld.value.inputFieldLabel ?? iptfld.value.inputFieldPlaceholder ?? iptfld.key }}</mat-label>
            <span *ngIf="iptfld.value.inputFieldPrefixText as iptfldpt" matTextPrefix>{{ iptfldpt }} &nbsp;</span>
            <mat-icon *ngIf="iptfld.value.inputFieldPrefixIcon as iptfldpi" matPrefix>{{ iptfldpi }}</mat-icon>
            <input
              matInput
              [placeholder]="(iptfld.value.inputFieldLabel === undefined ? undefined : iptfld.value.inputFieldPlaceholder) ?? ''"
              [readonly]="iptfld.value.inputFieldReadonly"
              [disabled]="iptfld.value.inputFieldDisabled ?? false"
              [required]="iptfld.value.inputFieldRequired ?? false"
              [type]="iptfld.value.inputFieldType ?? iptfldTypeDef"
              [autocomplete]="iptfld.value.inputFieldAutocomplete"
              [autocapitalize]="iptfld.value.inputFieldAutocapitalize"
              [(ngModel)]="iptfld.value.inputFieldValue" />
            <span *ngIf="iptfld.value.inputFieldSuffixText as iptfldst" matTextSuffix>{{ iptfldst }}</span>
            <mat-icon *ngIf="iptfld.value.inputFieldSuffixIcon as iptfldsi" matSuffix>{{ iptfldsi }}</mat-icon>
            <mat-hint *ngIf="iptfld.value.inputFieldHintStart as iptfldhst" align="start">{{ iptfldhst }}</mat-hint>
            <mat-hint *ngIf="iptfld.value.inputFieldHintEnd as iptfldhet" align="end">{{ iptfldhet }}</mat-hint>
            <mat-error>{{ iptfld.value.inputFieldErrorMessage || iptfldErrMessRequiredDef }}</mat-error>
          </mat-form-field>
        </div>
      </ng-container>
    </div>
    <div mat-dialog-actions *ngIf="dialButtons" [align]="data?.dialActionButtonsAlignment">
      <button
        *ngFor="let bt of dialButtons; trackBy: trackByDialButtonsFn"
        mat-button
        [color]="bt.buttonColor"
        [attr.cdkFocusInitial]="bt.isButtonFocusInitial"
        (click)="onButtonClick(bt.buttonResult)">
        {{ bt.buttonLibelle }}
      </button>
    </div>
  `,
  styles: [
    `
      .cont-form-field-input {
        margin-top: 1.4em;
      }
    `
  ],
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

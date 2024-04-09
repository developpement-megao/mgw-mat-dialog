import { ThemePalette } from '@angular/material/core';

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

import * as React from "react";
import {
  GridProps,
  SelectFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";

export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};

export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;

export declare type NewForm1InputValues = {
  name?: string;
  Field0?: string;
  Field1?: string;
  Field2?: string;
  Field3?: string;
  Field4?: string;
  Field5?: string;
};
export declare type NewForm1ValidationValues = {
  name?: ValidationFunction<string>;
  Field0?: ValidationFunction<string>;
  Field1?: ValidationFunction<string>;
  Field2?: ValidationFunction<string>;
  Field3?: ValidationFunction<string>;
  Field4?: ValidationFunction<string>;
  Field5?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;

export declare type NewForm1OverridesProps = {
  NewForm1Grid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  Field0?: PrimitiveOverrideProps<TextFieldProps>;
  Field1?: PrimitiveOverrideProps<TextFieldProps>;
  Field2?: PrimitiveOverrideProps<TextFieldProps>;
  Field3?: PrimitiveOverrideProps<SelectFieldProps>;
  Field4?: PrimitiveOverrideProps<TextFieldProps>;
  Field5?: PrimitiveOverrideProps<StorageManagerProps>;
} & EscapeHatchProps;

export declare type NewForm1Props = React.PropsWithChildren<
  {
    overrides?: NewForm1OverridesProps | undefined | null;
  } & {
    id?: string;
    customer?: Customer;
    onSubmit?: (fields: NewForm1InputValues) => NewForm1InputValues;
    onSuccess?: (fields: NewForm1InputValues) => void;
    onError?: (fields: NewForm1InputValues, errorMessage: string) => void;
    onChange?: (fields: NewForm1InputValues) => NewForm1InputValues;
    onValidate?: NewForm1ValidationValues;
  } & React.CSSProperties
>;
export default function NewForm1(props: NewForm1Props): React.ReactElement;

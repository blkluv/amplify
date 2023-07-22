/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Customer } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NewForm1InputValues = {
    name?: string;
    email?: string;
    address?: string;
    gender?: string;
    dateOfBirth?: string;
    Field4?: string;
    profileImage?: string;
};
export declare type NewForm1ValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    dateOfBirth?: ValidationFunction<string>;
    Field4?: ValidationFunction<string>;
    profileImage?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NewForm1OverridesProps = {
    NewForm1Grid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<SelectFieldProps>;
    dateOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    Field4?: PrimitiveOverrideProps<TextFieldProps>;
    profileImage?: PrimitiveOverrideProps<StorageManagerProps>;
} & EscapeHatchProps;
export declare type NewForm1Props = React.PropsWithChildren<{
    overrides?: NewForm1OverridesProps | undefined | null;
} & {
    id?: string;
    customer?: Customer;
    onSubmit?: (fields: NewForm1InputValues) => NewForm1InputValues;
    onSuccess?: (fields: NewForm1InputValues) => void;
    onError?: (fields: NewForm1InputValues, errorMessage: string) => void;
    onChange?: (fields: NewForm1InputValues) => NewForm1InputValues;
    onValidate?: NewForm1ValidationValues;
} & React.CSSProperties>;
export default function NewForm1(props: NewForm1Props): React.ReactElement;

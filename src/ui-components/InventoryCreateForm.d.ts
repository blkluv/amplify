/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type InventoryCreateFormInputValues = {
    quantity?: number;
    location?: string;
    productID?: string;
};
export declare type InventoryCreateFormValidationValues = {
    quantity?: ValidationFunction<number>;
    location?: ValidationFunction<string>;
    productID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InventoryCreateFormOverridesProps = {
    InventoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextAreaFieldProps>;
    productID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type InventoryCreateFormProps = React.PropsWithChildren<{
    overrides?: InventoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InventoryCreateFormInputValues) => InventoryCreateFormInputValues;
    onSuccess?: (fields: InventoryCreateFormInputValues) => void;
    onError?: (fields: InventoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InventoryCreateFormInputValues) => InventoryCreateFormInputValues;
    onValidate?: InventoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function InventoryCreateForm(props: InventoryCreateFormProps): React.ReactElement;

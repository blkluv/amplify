/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Inventory } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AddProductFormInputValues = {
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    tags?: string;
    Inventories?: Inventory[];
    productTags?: string[];
    productImages?: string[];
};
export declare type AddProductFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    price?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
    tags?: ValidationFunction<string>;
    Inventories?: ValidationFunction<Inventory>;
    productTags?: ValidationFunction<string>;
    productImages?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AddProductFormOverridesProps = {
    AddProductFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    tags?: PrimitiveOverrideProps<TextFieldProps>;
    Inventories?: PrimitiveOverrideProps<AutocompleteProps>;
    productTags?: PrimitiveOverrideProps<TextFieldProps>;
    productImages?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AddProductFormProps = React.PropsWithChildren<{
    overrides?: AddProductFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AddProductFormInputValues) => AddProductFormInputValues;
    onSuccess?: (fields: AddProductFormInputValues) => void;
    onError?: (fields: AddProductFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AddProductFormInputValues) => AddProductFormInputValues;
    onValidate?: AddProductFormValidationValues;
} & React.CSSProperties>;
export default function AddProductForm(props: AddProductFormProps): React.ReactElement;

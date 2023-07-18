/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Inventory } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type InventoryUpdateFormInputValues = {
    quantity?: number;
    location?: string;
    lastUpdated?: number;
    productID?: string;
};
export declare type InventoryUpdateFormValidationValues = {
    quantity?: ValidationFunction<number>;
    location?: ValidationFunction<string>;
    lastUpdated?: ValidationFunction<number>;
    productID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InventoryUpdateFormOverridesProps = {
    InventoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextAreaFieldProps>;
    lastUpdated?: PrimitiveOverrideProps<TextFieldProps>;
    productID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type InventoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: InventoryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    inventory?: Inventory;
    onSubmit?: (fields: InventoryUpdateFormInputValues) => InventoryUpdateFormInputValues;
    onSuccess?: (fields: InventoryUpdateFormInputValues) => void;
    onError?: (fields: InventoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InventoryUpdateFormInputValues) => InventoryUpdateFormInputValues;
    onValidate?: InventoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InventoryUpdateForm(props: InventoryUpdateFormProps): React.ReactElement;

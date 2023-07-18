/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Customer, Order, Cart as Cart0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CustomerUpdateFormInputValues = {
    name?: string;
    dateOfBirth?: string;
    email?: string;
    billingAddress?: string;
    shippingAddress?: string[];
    profileImage?: string;
    gender?: string;
    Orders?: Order[];
    Cart?: Cart0;
};
export declare type CustomerUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    dateOfBirth?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    billingAddress?: ValidationFunction<string>;
    shippingAddress?: ValidationFunction<string>;
    profileImage?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    Orders?: ValidationFunction<Order>;
    Cart?: ValidationFunction<Cart0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerUpdateFormOverridesProps = {
    CustomerUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    dateOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    billingAddress?: PrimitiveOverrideProps<TextAreaFieldProps>;
    shippingAddress?: PrimitiveOverrideProps<TextAreaFieldProps>;
    profileImage?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
    Orders?: PrimitiveOverrideProps<AutocompleteProps>;
    Cart?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CustomerUpdateFormProps = React.PropsWithChildren<{
    overrides?: CustomerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    customer?: Customer;
    onSubmit?: (fields: CustomerUpdateFormInputValues) => CustomerUpdateFormInputValues;
    onSuccess?: (fields: CustomerUpdateFormInputValues) => void;
    onError?: (fields: CustomerUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerUpdateFormInputValues) => CustomerUpdateFormInputValues;
    onValidate?: CustomerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerUpdateForm(props: CustomerUpdateFormProps): React.ReactElement;

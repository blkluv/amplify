/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { AuditLogs } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AuditLogsUpdateFormInputValues = {
    model?: string;
    opType?: string;
};
export declare type AuditLogsUpdateFormValidationValues = {
    model?: ValidationFunction<string>;
    opType?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AuditLogsUpdateFormOverridesProps = {
    AuditLogsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    model?: PrimitiveOverrideProps<TextFieldProps>;
    opType?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AuditLogsUpdateFormProps = React.PropsWithChildren<{
    overrides?: AuditLogsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    auditLogs?: AuditLogs;
    onSubmit?: (fields: AuditLogsUpdateFormInputValues) => AuditLogsUpdateFormInputValues;
    onSuccess?: (fields: AuditLogsUpdateFormInputValues) => void;
    onError?: (fields: AuditLogsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AuditLogsUpdateFormInputValues) => AuditLogsUpdateFormInputValues;
    onValidate?: AuditLogsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AuditLogsUpdateForm(props: AuditLogsUpdateFormProps): React.ReactElement;

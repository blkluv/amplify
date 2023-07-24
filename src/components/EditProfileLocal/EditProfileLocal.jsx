/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import {
  fetchByPath,
  processFile,
  validateField,
} from "../../ui-components/utils";
import { DataStore } from "aws-amplify";

const props = {
  idProp: undefined,
  customerModelProp: undefined,
  onSuccess: undefined,
  onError: undefined,
  onSubmit: undefined,
  onValidate: undefined,
  onChange: undefined,
  overrides: undefined,
};

export default function EditProfileLocal({ user }) {
  const initialValues = {
    name: "",
    email: "",
    DateOfBirth: "",
    address: "",
    gender: "",
    phoneNumber: "",
    profilePhoto: "",
  };

  const [name, setName] = React.useState(initialValues.name);
  const [email, setEmail] = React.useState(initialValues.email);
  const [DateOfBirth, setDateOfBirth] = React.useState(
    initialValues.DateOfBirth
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [profilePhoto, setProfilePhoto] = React.useState(
    initialValues.profilePhoto
  );
  const [errors, setErrors] = React.useState({});

  const resetStateValues = () => {
    const cleanValues = {};
    setName(cleanValues.name);
    setField0(cleanValues.Field0);
    setField1(cleanValues.Field1);
    setField2(cleanValues.Field2);
    setField3(cleanValues.Field3);
    setField4(cleanValues.Field4);
    setField5(cleanValues.Field5);
    setErrors({});
  };
  const [customerRecord, setCustomerRecord] = React.useState(customerModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Customer, idProp)
        : customerModelProp;
      setCustomerRecord(record);
    };
    queryData();
  }, [idProp, customerModelProp]);
  React.useEffect(resetStateValues, [customerRecord]);
  const validations = {
    name: [{ type: "Required" }],
    Field0: [{ type: "Email" }],
    Field1: [],
    Field2: [],
    Field3: [],
    Field4: [{ type: "Phone" }],
    Field5: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          Field0,
          Field1,
          Field2,
          Field3,
          Field4,
          Field5,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          const modelFieldsToSave = {
            name: modelFields.name,
          };
          await DataStore.save(
            Customer.copyOf(customerRecord, (updated) => {
              Object.assign(updated, modelFieldsToSave);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NewForm1")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              Field0,
              Field1,
              Field2,
              Field3,
              Field4,
              Field5,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Email"
        value={Field0}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              Field0: value,
              Field1,
              Field2,
              Field3,
              Field4,
              Field5,
            };
            const result = onChange(modelFields);
            value = result?.Field0 ?? value;
          }
          if (errors.Field0?.hasError) {
            runValidationTasks("Field0", value);
          }
          setField0(value);
        }}
        onBlur={() => runValidationTasks("Field0", Field0)}
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        {...getOverrideProps(overrides, "Field0")}
      ></TextField>
      <TextField
        label="Date of Birth"
        type="date"
        value={Field1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              Field0,
              Field1: value,
              Field2,
              Field3,
              Field4,
              Field5,
            };
            const result = onChange(modelFields);
            value = result?.Field1 ?? value;
          }
          if (errors.Field1?.hasError) {
            runValidationTasks("Field1", value);
          }
          setField1(value);
        }}
        onBlur={() => runValidationTasks("Field1", Field1)}
        errorMessage={errors.Field1?.errorMessage}
        hasError={errors.Field1?.hasError}
        {...getOverrideProps(overrides, "Field1")}
      ></TextField>
      <TextField
        label="Address"
        value={Field2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              Field0,
              Field1,
              Field2: value,
              Field3,
              Field4,
              Field5,
            };
            const result = onChange(modelFields);
            value = result?.Field2 ?? value;
          }
          if (errors.Field2?.hasError) {
            runValidationTasks("Field2", value);
          }
          setField2(value);
        }}
        onBlur={() => runValidationTasks("Field2", Field2)}
        errorMessage={errors.Field2?.errorMessage}
        hasError={errors.Field2?.hasError}
        {...getOverrideProps(overrides, "Field2")}
      ></TextField>
      <SelectField
        label="Gender"
        placeholder="Please select an option"
        value={Field3}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              Field0,
              Field1,
              Field2,
              Field3: value,
              Field4,
              Field5,
            };
            const result = onChange(modelFields);
            value = result?.Field3 ?? value;
          }
          if (errors.Field3?.hasError) {
            runValidationTasks("Field3", value);
          }
          setField3(value);
        }}
        onBlur={() => runValidationTasks("Field3", Field3)}
        errorMessage={errors.Field3?.errorMessage}
        hasError={errors.Field3?.hasError}
        {...getOverrideProps(overrides, "Field3")}
      >
        <option
          children="Male"
          value="Male"
          {...getOverrideProps(overrides, "Field3option0")}
        ></option>
        <option
          children="Femail"
          value="Femail"
          {...getOverrideProps(overrides, "Field3option1")}
        ></option>
        <option
          children="Prefer Not to Say"
          value="Prefer Not to Say"
          {...getOverrideProps(overrides, "Field3option2")}
        ></option>
      </SelectField>
      <TextField
        label="Phone Number"
        type="tel"
        value={Field4}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              Field0,
              Field1,
              Field2,
              Field3,
              Field4: value,
              Field5,
            };
            const result = onChange(modelFields);
            value = result?.Field4 ?? value;
          }
          if (errors.Field4?.hasError) {
            runValidationTasks("Field4", value);
          }
          setField4(value);
        }}
        onBlur={() => runValidationTasks("Field4", Field4)}
        errorMessage={errors.Field4?.errorMessage}
        hasError={errors.Field4?.hasError}
        {...getOverrideProps(overrides, "Field4")}
      ></TextField>
      <Field
        errorMessage={errors.Field5?.errorMessage}
        hasError={errors.Field5?.hasError}
        label={"Profile Photo"}
        descriptiveText={"Add your photo with size less than 10MB"}
        isRequired={false}
      >
        {customerRecord && (
          <StorageManager
            defaultFiles={[{ key: customerRecord.Field5 }]}
            onUploadSuccess={({ key }) => {
              setField5((prev) => {
                let value = key;
                if (onChange) {
                  const modelFields = {
                    name,
                    Field0,
                    Field1,
                    Field2,
                    Field3,
                    Field4,
                    Field5: value,
                  };
                  const result = onChange(modelFields);
                  value = result?.Field5 ?? value;
                }
                return value;
              });
            }}
            onFileRemove={({ key }) => {
              setField5((prev) => {
                let value = initialValues?.Field5;
                if (onChange) {
                  const modelFields = {
                    name,
                    Field0,
                    Field1,
                    Field2,
                    Field3,
                    Field4,
                    Field5: value,
                  };
                  const result = onChange(modelFields);
                  value = result?.Field5 ?? value;
                }
                return value;
              });
            }}
            processFile={processFile}
            accessLevel={"public"}
            acceptedFileTypes={["image/*"]}
            isResumable={false}
            showThumbnails={false}
            maxFileCount={1}
            maxSize={10000000}
            {...getOverrideProps(overrides, "Field5")}
          ></StorageManager>
        )}
      </Field>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || customerModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || customerModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Customer, Order, Cart as Cart0 } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function CustomerUpdateForm(props) {
  const {
    id: idProp,
    customer: customerModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    dateOfBirth: "",
    email: "",
    billingAddress: "",
    shippingAddress: [],
    profileImage: "",
    gender: "",
    Orders: [],
    Cart: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [billingAddress, setBillingAddress] = React.useState(
    initialValues.billingAddress
  );
  const [shippingAddress, setShippingAddress] = React.useState(
    initialValues.shippingAddress
  );
  const [profileImage, setProfileImage] = React.useState(
    initialValues.profileImage
  );
  const [gender, setGender] = React.useState(initialValues.gender);
  const [Orders, setOrders] = React.useState(initialValues.Orders);
  const [Cart, setCart] = React.useState(initialValues.Cart);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = customerRecord
      ? { ...initialValues, ...customerRecord, Orders: linkedOrders, Cart }
      : initialValues;
    setName(cleanValues.name);
    setDateOfBirth(cleanValues.dateOfBirth);
    setEmail(cleanValues.email);
    setBillingAddress(
      typeof cleanValues.billingAddress === "string"
        ? cleanValues.billingAddress
        : JSON.stringify(cleanValues.billingAddress)
    );
    setShippingAddress(
      cleanValues.shippingAddress?.map((item) =>
        typeof item === "string" ? item : JSON.stringify(item)
      ) ?? []
    );
    setCurrentShippingAddressValue("");
    setProfileImage(cleanValues.profileImage);
    setGender(cleanValues.gender);
    setOrders(cleanValues.Orders ?? []);
    setCurrentOrdersValue(undefined);
    setCurrentOrdersDisplayValue("");
    setCart(cleanValues.Cart);
    setCurrentCartValue(undefined);
    setCurrentCartDisplayValue("");
    setErrors({});
  };
  const [customerRecord, setCustomerRecord] = React.useState(customerModelProp);
  const [linkedOrders, setLinkedOrders] = React.useState([]);
  const canUnlinkOrders = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Customer, idProp)
        : customerModelProp;
      setCustomerRecord(record);
      const linkedOrders = record ? await record.Orders.toArray() : [];
      setLinkedOrders(linkedOrders);
      const CartRecord = record ? await record.Cart : undefined;
      setCart(CartRecord);
    };
    queryData();
  }, [idProp, customerModelProp]);
  React.useEffect(resetStateValues, [customerRecord, linkedOrders, Cart]);
  const [currentShippingAddressValue, setCurrentShippingAddressValue] =
    React.useState("");
  const shippingAddressRef = React.createRef();
  const [currentOrdersDisplayValue, setCurrentOrdersDisplayValue] =
    React.useState("");
  const [currentOrdersValue, setCurrentOrdersValue] = React.useState(undefined);
  const OrdersRef = React.createRef();
  const [currentCartDisplayValue, setCurrentCartDisplayValue] =
    React.useState("");
  const [currentCartValue, setCurrentCartValue] = React.useState(undefined);
  const CartRef = React.createRef();
  const getIDValue = {
    Orders: (r) => JSON.stringify({ id: r?.id }),
    Cart: (r) => JSON.stringify({ id: r?.id }),
  };
  const OrdersIdSet = new Set(
    Array.isArray(Orders)
      ? Orders.map((r) => getIDValue.Orders?.(r))
      : getIDValue.Orders?.(Orders)
  );
  const CartIdSet = new Set(
    Array.isArray(Cart)
      ? Cart.map((r) => getIDValue.Cart?.(r))
      : getIDValue.Cart?.(Cart)
  );
  const orderRecords = useDataStoreBinding({
    type: "collection",
    model: Order,
  }).items;
  const cartRecords = useDataStoreBinding({
    type: "collection",
    model: Cart0,
  }).items;
  const getDisplayValue = {
    Orders: (r) => `${r?.totalAmount ? r?.totalAmount + " - " : ""}${r?.id}`,
    Cart: (r) => `${r?.createdAt ? r?.createdAt + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    dateOfBirth: [],
    email: [{ type: "Email" }],
    billingAddress: [{ type: "JSON" }],
    shippingAddress: [{ type: "JSON" }],
    profileImage: [],
    gender: [],
    Orders: [],
    Cart: [],
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
          dateOfBirth,
          email,
          billingAddress,
          shippingAddress,
          profileImage,
          gender,
          Orders,
          Cart,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const promises = [];
          const ordersToLink = [];
          const ordersToUnLink = [];
          const ordersSet = new Set();
          const linkedOrdersSet = new Set();
          Orders.forEach((r) => ordersSet.add(getIDValue.Orders?.(r)));
          linkedOrders.forEach((r) =>
            linkedOrdersSet.add(getIDValue.Orders?.(r))
          );
          linkedOrders.forEach((r) => {
            if (!ordersSet.has(getIDValue.Orders?.(r))) {
              ordersToUnLink.push(r);
            }
          });
          Orders.forEach((r) => {
            if (!linkedOrdersSet.has(getIDValue.Orders?.(r))) {
              ordersToLink.push(r);
            }
          });
          ordersToUnLink.forEach((original) => {
            if (!canUnlinkOrders) {
              throw Error(
                `Order ${original.id} cannot be unlinked from Customer because customerID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Order.copyOf(original, (updated) => {
                  updated.customerID = null;
                })
              )
            );
          });
          ordersToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Order.copyOf(original, (updated) => {
                  updated.customerID = customerRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            dateOfBirth: modelFields.dateOfBirth,
            email: modelFields.email,
            profileImage: modelFields.profileImage,
            gender: modelFields.gender,
            Cart: modelFields.Cart,
            shippingAddress: modelFields.shippingAddress.map((s) =>
              JSON.parse(s)
            ),
            billingAddress: modelFields.billingAddress
              ? JSON.parse(modelFields.billingAddress)
              : modelFields.billingAddress,
          };
          promises.push(
            DataStore.save(
              Customer.copyOf(customerRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
                if (!modelFieldsToSave.Cart) {
                  updated.customerCartId = undefined;
                }
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CustomerUpdateForm")}
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
              dateOfBirth,
              email,
              billingAddress,
              shippingAddress,
              profileImage,
              gender,
              Orders,
              Cart,
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
        label="Date of birth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth: value,
              email,
              billingAddress,
              shippingAddress,
              profileImage,
              gender,
              Orders,
              Cart,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              email: value,
              billingAddress,
              shippingAddress,
              profileImage,
              gender,
              Orders,
              Cart,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextAreaField
        label="Billing address"
        isRequired={false}
        isReadOnly={false}
        value={billingAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              email,
              billingAddress: value,
              shippingAddress,
              profileImage,
              gender,
              Orders,
              Cart,
            };
            const result = onChange(modelFields);
            value = result?.billingAddress ?? value;
          }
          if (errors.billingAddress?.hasError) {
            runValidationTasks("billingAddress", value);
          }
          setBillingAddress(value);
        }}
        onBlur={() => runValidationTasks("billingAddress", billingAddress)}
        errorMessage={errors.billingAddress?.errorMessage}
        hasError={errors.billingAddress?.hasError}
        {...getOverrideProps(overrides, "billingAddress")}
      ></TextAreaField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              email,
              billingAddress,
              shippingAddress: values,
              profileImage,
              gender,
              Orders,
              Cart,
            };
            const result = onChange(modelFields);
            values = result?.shippingAddress ?? values;
          }
          setShippingAddress(values);
          setCurrentShippingAddressValue("");
        }}
        currentFieldValue={currentShippingAddressValue}
        label={"Shipping address"}
        items={shippingAddress}
        hasError={errors?.shippingAddress?.hasError}
        errorMessage={errors?.shippingAddress?.errorMessage}
        setFieldValue={setCurrentShippingAddressValue}
        inputFieldRef={shippingAddressRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Shipping address"
          isRequired={false}
          isReadOnly={false}
          value={currentShippingAddressValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.shippingAddress?.hasError) {
              runValidationTasks("shippingAddress", value);
            }
            setCurrentShippingAddressValue(value);
          }}
          onBlur={() =>
            runValidationTasks("shippingAddress", currentShippingAddressValue)
          }
          errorMessage={errors.shippingAddress?.errorMessage}
          hasError={errors.shippingAddress?.hasError}
          ref={shippingAddressRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "shippingAddress")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Profile image"
        isRequired={false}
        isReadOnly={false}
        value={profileImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              email,
              billingAddress,
              shippingAddress,
              profileImage: value,
              gender,
              Orders,
              Cart,
            };
            const result = onChange(modelFields);
            value = result?.profileImage ?? value;
          }
          if (errors.profileImage?.hasError) {
            runValidationTasks("profileImage", value);
          }
          setProfileImage(value);
        }}
        onBlur={() => runValidationTasks("profileImage", profileImage)}
        errorMessage={errors.profileImage?.errorMessage}
        hasError={errors.profileImage?.hasError}
        {...getOverrideProps(overrides, "profileImage")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              email,
              billingAddress,
              shippingAddress,
              profileImage,
              gender: value,
              Orders,
              Cart,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              email,
              billingAddress,
              shippingAddress,
              profileImage,
              gender,
              Orders: values,
              Cart,
            };
            const result = onChange(modelFields);
            values = result?.Orders ?? values;
          }
          setOrders(values);
          setCurrentOrdersValue(undefined);
          setCurrentOrdersDisplayValue("");
        }}
        currentFieldValue={currentOrdersValue}
        label={"Orders"}
        items={Orders}
        hasError={errors?.Orders?.hasError}
        errorMessage={errors?.Orders?.errorMessage}
        getBadgeText={getDisplayValue.Orders}
        setFieldValue={(model) => {
          setCurrentOrdersDisplayValue(
            model ? getDisplayValue.Orders(model) : ""
          );
          setCurrentOrdersValue(model);
        }}
        inputFieldRef={OrdersRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Orders"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Order"
          value={currentOrdersDisplayValue}
          options={orderRecords
            .filter((r) => !OrdersIdSet.has(getIDValue.Orders?.(r)))
            .map((r) => ({
              id: getIDValue.Orders?.(r),
              label: getDisplayValue.Orders?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentOrdersValue(
              orderRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentOrdersDisplayValue(label);
            runValidationTasks("Orders", label);
          }}
          onClear={() => {
            setCurrentOrdersDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Orders?.hasError) {
              runValidationTasks("Orders", value);
            }
            setCurrentOrdersDisplayValue(value);
            setCurrentOrdersValue(undefined);
          }}
          onBlur={() => runValidationTasks("Orders", currentOrdersDisplayValue)}
          errorMessage={errors.Orders?.errorMessage}
          hasError={errors.Orders?.hasError}
          ref={OrdersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Orders")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              email,
              billingAddress,
              shippingAddress,
              profileImage,
              gender,
              Orders,
              Cart: value,
            };
            const result = onChange(modelFields);
            value = result?.Cart ?? value;
          }
          setCart(value);
          setCurrentCartValue(undefined);
          setCurrentCartDisplayValue("");
        }}
        currentFieldValue={currentCartValue}
        label={"Cart"}
        items={Cart ? [Cart] : []}
        hasError={errors?.Cart?.hasError}
        errorMessage={errors?.Cart?.errorMessage}
        getBadgeText={getDisplayValue.Cart}
        setFieldValue={(model) => {
          setCurrentCartDisplayValue(model ? getDisplayValue.Cart(model) : "");
          setCurrentCartValue(model);
        }}
        inputFieldRef={CartRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Cart"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Cart"
          value={currentCartDisplayValue}
          options={cartRecords
            .filter((r) => !CartIdSet.has(getIDValue.Cart?.(r)))
            .map((r) => ({
              id: getIDValue.Cart?.(r),
              label: getDisplayValue.Cart?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCartValue(
              cartRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentCartDisplayValue(label);
            runValidationTasks("Cart", label);
          }}
          onClear={() => {
            setCurrentCartDisplayValue("");
          }}
          defaultValue={Cart}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Cart?.hasError) {
              runValidationTasks("Cart", value);
            }
            setCurrentCartDisplayValue(value);
            setCurrentCartValue(undefined);
          }}
          onBlur={() => runValidationTasks("Cart", currentCartDisplayValue)}
          errorMessage={errors.Cart?.errorMessage}
          hasError={errors.Cart?.hasError}
          ref={CartRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Cart")}
        ></Autocomplete>
      </ArrayField>
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

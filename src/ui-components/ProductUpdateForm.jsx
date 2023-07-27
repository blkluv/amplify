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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Product, Inventory, Cart } from "../models";
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
export default function ProductUpdateForm(props) {
  const {
    id: idProp,
    product: productModelProp,
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
    description: "",
    price: "",
    category: "",
    productTags: [],
    Inventories: [],
    cartID: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [price, setPrice] = React.useState(initialValues.price);
  const [category, setCategory] = React.useState(initialValues.category);
  const [productTags, setProductTags] = React.useState(
    initialValues.productTags
  );
  const [Inventories, setInventories] = React.useState(
    initialValues.Inventories
  );
  const [cartID, setCartID] = React.useState(initialValues.cartID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = productRecord
      ? {
          ...initialValues,
          ...productRecord,
          Inventories: linkedInventories,
          cartID,
        }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setPrice(cleanValues.price);
    setCategory(cleanValues.category);
    setProductTags(cleanValues.productTags ?? []);
    setCurrentProductTagsValue("");
    setInventories(cleanValues.Inventories ?? []);
    setCurrentInventoriesValue(undefined);
    setCurrentInventoriesDisplayValue("");
    setCartID(cleanValues.cartID);
    setCurrentCartIDValue(undefined);
    setCurrentCartIDDisplayValue("");
    setErrors({});
  };
  const [productRecord, setProductRecord] = React.useState(productModelProp);
  const [linkedInventories, setLinkedInventories] = React.useState([]);
  const canUnlinkInventories = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Product, idProp)
        : productModelProp;
      setProductRecord(record);
      const linkedInventories = record
        ? await record.Inventories.toArray()
        : [];
      setLinkedInventories(linkedInventories);
      const cartIDRecord = record ? await record.cartID : undefined;
      setCartID(cartIDRecord);
    };
    queryData();
  }, [idProp, productModelProp]);
  React.useEffect(resetStateValues, [productRecord, linkedInventories, cartID]);
  const [currentProductTagsValue, setCurrentProductTagsValue] =
    React.useState("");
  const productTagsRef = React.createRef();
  const [currentInventoriesDisplayValue, setCurrentInventoriesDisplayValue] =
    React.useState("");
  const [currentInventoriesValue, setCurrentInventoriesValue] =
    React.useState(undefined);
  const InventoriesRef = React.createRef();
  const [currentCartIDDisplayValue, setCurrentCartIDDisplayValue] =
    React.useState("");
  const [currentCartIDValue, setCurrentCartIDValue] = React.useState(undefined);
  const cartIDRef = React.createRef();
  const getIDValue = {
    Inventories: (r) => JSON.stringify({ id: r?.id }),
  };
  const InventoriesIdSet = new Set(
    Array.isArray(Inventories)
      ? Inventories.map((r) => getIDValue.Inventories?.(r))
      : getIDValue.Inventories?.(Inventories)
  );
  const inventoryRecords = useDataStoreBinding({
    type: "collection",
    model: Inventory,
  }).items;
  const cartRecords = useDataStoreBinding({
    type: "collection",
    model: Cart,
  }).items;
  const getDisplayValue = {
    Inventories: (r) => `${r?.quantity ? r?.quantity + " - " : ""}${r?.id}`,
    cartID: (r) => `${r?.createdAt ? r?.createdAt + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    description: [],
    price: [],
    category: [],
    productTags: [],
    Inventories: [],
    cartID: [],
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
          description,
          price,
          category,
          productTags,
          Inventories,
          cartID,
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
          const inventoriesToLink = [];
          const inventoriesToUnLink = [];
          const inventoriesSet = new Set();
          const linkedInventoriesSet = new Set();
          Inventories.forEach((r) =>
            inventoriesSet.add(getIDValue.Inventories?.(r))
          );
          linkedInventories.forEach((r) =>
            linkedInventoriesSet.add(getIDValue.Inventories?.(r))
          );
          linkedInventories.forEach((r) => {
            if (!inventoriesSet.has(getIDValue.Inventories?.(r))) {
              inventoriesToUnLink.push(r);
            }
          });
          Inventories.forEach((r) => {
            if (!linkedInventoriesSet.has(getIDValue.Inventories?.(r))) {
              inventoriesToLink.push(r);
            }
          });
          inventoriesToUnLink.forEach((original) => {
            if (!canUnlinkInventories) {
              throw Error(
                `Inventory ${original.id} cannot be unlinked from Product because productID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Inventory.copyOf(original, (updated) => {
                  updated.productID = null;
                })
              )
            );
          });
          inventoriesToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Inventory.copyOf(original, (updated) => {
                  updated.productID = productRecord.id;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            description: modelFields.description,
            price: modelFields.price,
            category: modelFields.category,
            productTags: modelFields.productTags,
            cartID: modelFields.cartID,
          };
          promises.push(
            DataStore.save(
              Product.copyOf(productRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
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
      {...getOverrideProps(overrides, "ProductUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              description,
              price,
              category,
              productTags,
              Inventories,
              cartID,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description: value,
              price,
              category,
              productTags,
              Inventories,
              cartID,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        value={price}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              price: value,
              category,
              productTags,
              Inventories,
              cartID,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              price,
              category: value,
              productTags,
              Inventories,
              cartID,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              price,
              category,
              productTags: values,
              Inventories,
              cartID,
            };
            const result = onChange(modelFields);
            values = result?.productTags ?? values;
          }
          setProductTags(values);
          setCurrentProductTagsValue("");
        }}
        currentFieldValue={currentProductTagsValue}
        label={"Product tags"}
        items={productTags}
        hasError={errors?.productTags?.hasError}
        errorMessage={errors?.productTags?.errorMessage}
        setFieldValue={setCurrentProductTagsValue}
        inputFieldRef={productTagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Product tags"
          isRequired={false}
          isReadOnly={false}
          value={currentProductTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.productTags?.hasError) {
              runValidationTasks("productTags", value);
            }
            setCurrentProductTagsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("productTags", currentProductTagsValue)
          }
          errorMessage={errors.productTags?.errorMessage}
          hasError={errors.productTags?.hasError}
          ref={productTagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "productTags")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              description,
              price,
              category,
              productTags,
              Inventories: values,
              cartID,
            };
            const result = onChange(modelFields);
            values = result?.Inventories ?? values;
          }
          setInventories(values);
          setCurrentInventoriesValue(undefined);
          setCurrentInventoriesDisplayValue("");
        }}
        currentFieldValue={currentInventoriesValue}
        label={"Inventories"}
        items={Inventories}
        hasError={errors?.Inventories?.hasError}
        errorMessage={errors?.Inventories?.errorMessage}
        getBadgeText={getDisplayValue.Inventories}
        setFieldValue={(model) => {
          setCurrentInventoriesDisplayValue(
            model ? getDisplayValue.Inventories(model) : ""
          );
          setCurrentInventoriesValue(model);
        }}
        inputFieldRef={InventoriesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Inventories"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Inventory"
          value={currentInventoriesDisplayValue}
          options={inventoryRecords
            .filter((r) => !InventoriesIdSet.has(getIDValue.Inventories?.(r)))
            .map((r) => ({
              id: getIDValue.Inventories?.(r),
              label: getDisplayValue.Inventories?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentInventoriesValue(
              inventoryRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentInventoriesDisplayValue(label);
            runValidationTasks("Inventories", label);
          }}
          onClear={() => {
            setCurrentInventoriesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Inventories?.hasError) {
              runValidationTasks("Inventories", value);
            }
            setCurrentInventoriesDisplayValue(value);
            setCurrentInventoriesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Inventories", currentInventoriesDisplayValue)
          }
          errorMessage={errors.Inventories?.errorMessage}
          hasError={errors.Inventories?.hasError}
          ref={InventoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Inventories")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              description,
              price,
              category,
              productTags,
              Inventories,
              cartID: value,
            };
            const result = onChange(modelFields);
            value = result?.cartID ?? value;
          }
          setCartID(value);
          setCurrentCartIDValue(undefined);
        }}
        currentFieldValue={currentCartIDValue}
        label={"Cart id"}
        items={cartID ? [cartID] : []}
        hasError={errors?.cartID?.hasError}
        errorMessage={errors?.cartID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.cartID(cartRecords.find((r) => r.id === value))
            : ""
        }
        setFieldValue={(value) => {
          setCurrentCartIDDisplayValue(
            value
              ? getDisplayValue.cartID(cartRecords.find((r) => r.id === value))
              : ""
          );
          setCurrentCartIDValue(value);
        }}
        inputFieldRef={cartIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Cart id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Cart"
          value={currentCartIDDisplayValue}
          options={cartRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.cartID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCartIDValue(id);
            setCurrentCartIDDisplayValue(label);
            runValidationTasks("cartID", label);
          }}
          onClear={() => {
            setCurrentCartIDDisplayValue("");
          }}
          defaultValue={cartID}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.cartID?.hasError) {
              runValidationTasks("cartID", value);
            }
            setCurrentCartIDDisplayValue(value);
            setCurrentCartIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("cartID", currentCartIDValue)}
          errorMessage={errors.cartID?.errorMessage}
          hasError={errors.cartID?.hasError}
          ref={cartIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "cartID")}
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
          isDisabled={!(idProp || productModelProp)}
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
              !(idProp || productModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

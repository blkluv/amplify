import { StorageManager } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

export const DefaultStorageManager = () => {
  return (
    <StorageManager
      acceptedFileTypes={["image/*"]}
      accessLevel="public"
      maxFileCount={1}
      isResumable
    />
  );
};

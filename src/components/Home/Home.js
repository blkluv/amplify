import { Heading } from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { Storage } from "@aws-amplify/storage";
import { Auth } from "aws-amplify";
import { useState } from "react";
import "@aws-amplify/ui-react/styles.css";

export function Home() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [key, setKey] = useState(null);

  const handleStorage = async () =>
    await Storage.put("test.txt", "Protected Content", {
      level: "protected",
      contentType: "text/plain",
    });

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
    downloadFile();
    console.log("attributes:", user.attributes);
  }

  async function updateUser() {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      address: "105 Main St. New York, NY 10001",
    });
  }

  const processFile = async ({ file }) => {
    const fileExtension = file.name.split(".").pop();

    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest("SHA-1", filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, "0"))
          .join("");
        setKey(`${hashHex}.${fileExtension}`);
        return { file, key: `${hashHex}.${fileExtension}` };
      });
  };

  // const handleInput = async (e) => {
  //   const file = e.target.files[0];
  //   const { key } = await processFile({ file });
  //   const result = await Storage.put(key, file, {
  //     level: "protected",
  //     contentType: file.type,
  //   });

  //   const user = await Auth.currentAuthenticatedUser();
  //   await Auth.updateUserAttributes(user, {
  //     picture: key,
  //   }).catch((err) => console.log(err));

  //   console.log("result:", result);
  // };

  const downloadFile = async () => {
    await Storage.get("3f991d05f9688b40d23511d2cf424aefbcfbea65.png", {
      level: "public",
    })
      .then((result) => {
        setImage(result);
      })
      .catch((err) => console.log(err));
  };

  async function deleteUserAttribute() {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.deleteUserAttributes(user, ["picture"]);
  }

  const onUploadSuccess = async (result) => {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      picture: key,
    }).catch((err) => console.log(err));
    console.log("result:", result);
  };

  return (
    <>
      <Heading level={3}>
        Please use the buttons at the top to test out protected routes!
      </Heading>
      <button onClick={getUserInfo}>get user info</button>
      <button onClick={updateUser}>update user</button>
      <button onClick={deleteUserAttribute}>delete user attribute</button>
      {/* <input type="file" onChange={handleInput} /> */}
      <StorageManager
        acceptedFileTypes={["image/*"]}
        accessLevel="public"
        maxFileCount={1}
        isResumable
        processFile={processFile}
        onUploadSuccess={onUploadSuccess}
      />
      <img src={image} alt="" />
    </>
  );
}

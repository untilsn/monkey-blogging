import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export function useFirebaseImage(setValue, getValues) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  // ? neu khong truyen value se loi
  if (!setValue || !getValues) return;

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressBar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progressBar);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log("error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
    setProgress(0);
  };

  //todo delete image
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(imageRef)
      .then(() => {
        console.log("success delete");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("cant delete image");
      });
  };

  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };

  return {
    image,
    handleResetUpload,
    progress,
    handleDeleteImage,
    handleSelectImage,
  };
}

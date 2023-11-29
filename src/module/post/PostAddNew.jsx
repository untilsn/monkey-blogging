import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Field from "../../components/field/Field";
import Label from "../../components/lables/Label";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Input from "../../components/inputs/Input";
import slugify from "slugify";
import { postStatus } from "../../utils/Contant";
import ImageUpload from "../../components/image/ImageUpload";
import { useFirebaseImage } from "../../hook/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useAuth } from "../../context/Auth-context";
import { db } from "../../firebase-app/Firebase-config";
// dropdown
import Dropdown from "../../components/dropdown/Dropdown";
import Option from "../../components/dropdown/Option";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  //? useHook

  const { userInfo } = useAuth();

  // ? react hook form
  const { control, watch, setValue, getValues, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: "",
    },
  });
  // ? watch
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    handleDeleteImage,
    handleSelectImage,
    image,
    handleResetUpload,
    progress,
  } = useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selecteCategory, setSelecteCategory] = useState("");
  const [loading, setLoading] = useState(false);
  // ? add post
  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      const clonevalues = { ...values };
      // slugify dung de convers  thanh slug
      clonevalues.slug = slugify(values.slug || values.title, { lower: true });
      clonevalues.status = Number(values.status);
      // handleUploadImage(clonevalues.image);
      const colRef = collection(db, "post");
      await addDoc(colRef, {
        ...clonevalues,
        image,
        userId: userInfo.uid,
        createAt: serverTimestamp(),
      });
      console.log(values);
      toast.success("update post success");
      reset({
        title: "",
        slug: "",
        status: 2,
        categoryId: "",
        hot: false,
        image: "",
      });
      handleResetUpload();
      setSelecteCategory({});
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Monkey-Blog/Add-new-post";
  }, []);

  // category
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
    setSelecteCategory(item);
  };

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              onChange={handleSelectImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select
                className="capitalize"
                placeholder={`${selecteCategory.name || "Selecte category"}`}
              ></Select>
              <List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Option
                      onClick={() => handleClickOption(item)}
                      key={item.id}
                    >
                      {item.name}
                    </Option>
                  ))}
              </List>
            </Dropdown>
            {selecteCategory?.name && (
              <span className="inline-block p-4 text-sm font-semibold text-green-500 rounded-xl bg-gray-50">
                {selecteCategory?.name}
              </span>
            )}
          </Field>
          <Field>
            <Label>Author</Label>
            <Input
              name="name"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          $isloading={loading}
          disabled={loading}
          className="mx-auto w-[250px]"
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;

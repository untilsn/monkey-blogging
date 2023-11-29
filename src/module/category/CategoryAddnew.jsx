import React from "react";
import { useForm } from "react-hook-form";
import Field from "../../components/field/Field";
import Label from "../../components/lables/Label";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import Input from "../../components/inputs/Input";
import DashboardHeading from "../../drafts/DashboardHeading";
import FieldCheckbox from "../../components/field/FieldCheckbox";
import slugify from "slugify";
import { categoryStatus } from "../../utils/Contant";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-app/Firebase-config";
import { toast } from "react-toastify";

const CategoryAddnew = () => {
  const {
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createAt: new Date(),
    },
  });
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const newValue = { ...values };
    newValue.slug = slugify(newValue.name || newValue.slug, { lower: true });
    newValue.status = Number(newValue.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValue,
        createAt: serverTimestamp(),
      });
      toast.success("message success");
    } catch (error) {
      toast.success(message.error);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createAt: new Date(),
      });
    }
  };

  const watchStatus = watch("status");

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <FieldCheckbox>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckbox>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          disabled={isSubmitting}
          $isloading={isSubmitting}
        >
          Add category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddnew;

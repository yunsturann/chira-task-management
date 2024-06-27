"use client";

import Button from "@/components/ui/Button";
// ** Custom Compoents
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// ** Third Party Libs
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name is too short")
    .max(50, "Name is too long"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup
    .string()
    .required("Subject is required")
    .min(5, "Subject is too short")
    .max(50, "Subject is too long"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message is too short"),
});

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmitMail = async (formdata: ContactForm) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      toast.success(data.message, { duration: 5000 });
      reset();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitMail)}
      className="flex flex-col gap-y-4"
    >
      <Input
        {...register("name")}
        label="Name"
        placeholder="e.g. Yunus"
        error={errors.name?.message}
      />
      <Input
        {...register("email")}
        label="Email"
        placeholder="e.g. ynstrn@gmail.com"
        error={errors.email?.message}
      />
      <Input
        {...register("subject")}
        label="Subject"
        placeholder="e.g. Inquiry about your services"
        error={errors.subject?.message}
      />
      <TextArea
        {...register("message")}
        label="Message"
        placeholder="e.g. I would like to inquire about your services..."
        rows={5}
        error={errors.message?.message}
      />
      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-y-3 gap-x-12 mt-4">
        <Button type="button" color="red" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" color="green" disabled={isSubmitting}>
          Send email
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

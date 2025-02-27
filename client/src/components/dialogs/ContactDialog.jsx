import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "../forms/Input";
import PhoneInput from "../Forms/PhoneInput";
import { getContactById } from "../../api/contactApi";
import { isValidPhoneNumber } from "libphonenumber-js";

const ContactDialog = ({
  modalIsOpen,
  onClose,
  contactID,
  formControl,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    clearErrors,
  } = formControl;

  function closeModal() {
    onClose(false);
  }

  useEffect(() => {
    if (modalIsOpen) {
      clearErrors();
    }
  }, [modalIsOpen, reset, clearErrors]);

  useEffect(() => {
    if (contactID) {
      fetchContactDetail();
    }
  }, [contactID]);

  const fetchContactDetail = async () => {
    try {
      const response = await getContactById(contactID);
      reset({ ...response.data, phone: response.data.phone ?? "" });
    } catch (error) {}
  };

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="overlay"
        closeTimeoutMS={200}
      >
        <div className="relative">
          <h2 className="text-2xl text-[#333] font-medium">
            {contactID ? "Edit Contact" : "Add Contact"}
          </h2>
          <button className="absolute top-0 right-0" onClick={closeModal}>
            <XMarkIcon className="text-stone-700 h-5 w-5 stroke-[3] hover:text-stone-900" />
          </button>

          <form
            className="space-y-5 mt-2"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                {...register("name", {
                  required: "Please enter name",
                })}
                name="name"
                placeholder="Type your name"
                labelText="Name"
                requiredMarker
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : null}
              />
            </div>
            <div>
              <Input
                {...register("email", {
                  required: "Please enter email",
                })}
                name="email"
                placeholder="Type your email"
                labelText="Email"
                requiredMarker
                type="email"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : null}
              />
            </div>
            <div>
              <PhoneInput
                {...register("phone", {
                  required: "Please enter mobile number",
                  validate: (value) => {
                    return isValidPhoneNumber(value) || "Please enter a valid phone number";
                  },
                })}
                control={control}
                name="phone"
                placeholder="Type your mobile no"
                labelText="Mobile"
                error={errors.phone ? true : false}
                helperText={errors.phone ? errors.phone.message : null}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="button primary-outline-btn click-transition py-1.5 min-w-24 mt-4"
                disabled={isLoading}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button primary-btn click-transition py-1.5 min-w-24 mt-4"
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default ContactDialog;

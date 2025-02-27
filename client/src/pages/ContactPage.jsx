import React, { useEffect, useState } from "react";
import {
  createContact,
  deleteContact,
  searchContacts,
  updateContact,
} from "../api/contactApi";
import Table from "../components/Table";
import Dropdown from "../components/forms/Dropdown";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/forms/SearchInput";
import ContactDialog from "../components/dialogs/ContactDialog";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "libphonenumber-js";

const ContactPage = () => {
  const [contactData, setContactData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedContactID, setSelectedContactID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "createdAt";

  // const {
  //     register,
  //     handleSubmit,
  //     control,
  //     reset,
  //     formState: { errors },
  //   } = useForm();

  const contactFormControl = useForm({ mode: "onSubmit" });

  useEffect(() => {
    fetchContacts(searchParams);
  }, [searchParams]);

  const fetchContacts = async (searchParams) => {
    try {
      const response = await searchContacts(query, sort);
      setContactData(response.data);
    } catch (error) {}
  };

  const handleFilterQuery = (key, value) => {
    setSearchParams((prevParams) => {
      let searchVal = prevParams.get(key);

      prevParams.set(key, value);

      if (searchVal === value) {
        prevParams.delete(key);
      }

      return prevParams;
    });
  };

  function openModal() {
    setIsOpen(true);
  }

  const columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
    { header: "Created Date", key: "createdAt" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div>
          <a
            className="text-indigo-600 hover:text-indigo-900 mr-4"
            onClick={() => {
              setSelectedContactID(row.id);
              setIsOpen(true);
            }}
          >
            Edit
          </a>
          <a
            className="text-red-600 hover:text-red-900"
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            Delete
          </a>
        </div>
      ),
    },
  ];

  const handleAddContact = () => {
    setSelectedContactID(null);
    contactFormControl.reset({
      name: "",
      email: "",
      phone: "",
    });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log("error", error);
    } finally {
      fetchContacts();
    }
  };

  const onSubmit = async (values) => {
    let formValues = {
      ...values,
    };

    try {
      setIsLoading(true);
      if (selectedContactID) {
        const { data } = await updateContact(selectedContactID, formValues);

        if (data) {
          toast.success("Contact updated successfully");
          fetchContacts();
          handleCloseModal();
        }
      } else {
        const { data } = await createContact(formValues);

        if (data) {
          toast.success("Contact created successfully");
          fetchContacts();
          handleCloseModal();
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-5">
      {/* <form className="p-10" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 bg-slate-400"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6  bg-slate-400"
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-md">
          <SearchInput searchValue={query == null ? "" : query} />
        </div>

        <div className="max-w-[240px] flex gap-x-2 items-center">
          <label className="label text-md w-[70px]" htmlFor="sort">
            Sort by
          </label>
          <Dropdown
            options={[
              { value: "name", label: "Name" },
              { value: "createdAt", label: "Created Date" },
            ]}
            name="sort"
            selectedItem={sort}
            placeholder="Sort By"
            className="py-2 cursor-pointer"
            onChange={(value) => {
              handleFilterQuery("sort", value);
            }}
            position="top-[46px]"
            hoverExpand
          />
        </div>

        <button onClick={handleAddContact} className="button primary-btn">
          Add Contact
        </button>
      </div>
      <Table columns={columns} data={contactData} />
      <ContactDialog
        modalIsOpen={modalIsOpen}
        onClose={() => handleCloseModal()}
        formControl={contactFormControl}
        contactID={selectedContactID}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ContactPage;

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import {
  createContact,
  deleteContact,
  searchContacts,
  updateContact,
} from "../api/contactApi";
import Table from "../components/Table";
import Dropdown from "../components/forms/Dropdown";
import SearchInput from "../components/forms/SearchInput";
import ContactDialog from "../components/dialogs/ContactDialog";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const ContactPage = () => {
  const [contactData, setContactData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedContactID, setSelectedContactID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "createdAt";

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

  const columns = useMemo(
    () => [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      {
        header: "Created Date",
        key: "createdAt",
        render: (row) => dayjs(row.createdAt).format("MMM D YYYY, h:mm A"),
      },
      {
        header: "Actions",
        key: "actions",
        render: (row) => (
          <div className="flex items-center gap-4">
            <a
              onClick={() => {
                setSelectedContactID(row.id);
                setIsOpen(true);
              }}
            >
              <PencilSquareIcon className="h-5 w-5 transition-transform duration-300 text-[#757D8A] hover:text-slate-600 cursor-pointer" />
            </a>
            <a
              onClick={() => {
                handleDelete(row.id);
              }}
            >
              <TrashIcon className="h-5 w-5 transition-transform duration-300 text-red-500 hover:text-red-600 stroke-1 cursor-pointer" />
            </a>
          </div>
        ),
      },
    ],
    []
  );

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
    const spaceIndex = values.phone.indexOf(" "); // check if there value after the country code
    const phone = spaceIndex !== -1 ? values.phone : ""; // if no value after country code, set phone to empty string

    let formValues = {
      ...values,
      phone,
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
      <div className="flex justify-between items-center mb-8 flex-wrap">
        <div className="flex-1 max-w-md">
          <SearchInput searchValue={query == null ? "" : query} />
        </div>

        <div className="max-w-[240px] flex gap-x-2 items-center mt-3 md:mt-0">
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

        <button
          onClick={handleAddContact}
          className="button primary-btn flex gap-1 mt-3 md:mt-0"
        >
          <PlusIcon className="h-5 w-5 text-white stroke-2" />
          <span className="text-md">Add Contact</span>
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

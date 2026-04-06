import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createDoctor } from "../features/adminActions";

const CreateDoctor = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);

  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "image") {
        if (data.image && data.image[0]) {
          formData.append("image", data.image[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    dispatch(createDoctor(formData));
    reset();
    setPreviewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create New Doctor
        </h1>
        <p className="text-gray-500 mt-1">
          Add a new doctor to your hospital system
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-6"
        >
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Doctor Image
            </label>

            <div className="flex items-center gap-6">
              <div className="w-28 h-28 rounded-xl bg-gray-100 border flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    No Image
                  </span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                onChange={handleImageChange}
                className="block text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-indigo-600 file:text-white
                hover:file:bg-indigo-700"
              />
            </div>

            {errors.image && (
              <p className="text-red-500 text-sm mt-2">
                Doctor image is required
              </p>
            )}
          </div>

      
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "firstName", placeholder: "Full Name" },
              { name: "emailId", placeholder: "Email", type: "email" },
              { name: "passWord", placeholder: "Password", type: "password" },
              { name: "specialization", placeholder: "Specialization" },
              { name: "experience", placeholder: "Experience (Years)", type: "number" },
              { name: "fees", placeholder: "Consultation Fees", type: "number" },
              { name: "phone", placeholder: "Phone Number" },
            ].map((field, i) => (
              <div key={i}>
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  {...register(field.name, { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.placeholder} is required
                  </p>
                )}
              </div>
            ))}
          </div>

          
          <div>
            <textarea
              placeholder="Doctor Description"
              rows="4"
              {...register("description", { required: true })}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>


          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-sm disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctor;

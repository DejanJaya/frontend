"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [name, setTitle] = useState("");
  const [address, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("http://localhost:8080/health/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
      }),
    });

    setIsMutating(false);

    setTitle("");
    setPrice("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Health</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Health Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setPrice(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

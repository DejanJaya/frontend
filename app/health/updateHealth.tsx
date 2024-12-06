"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  address: string;
};

export default function UpdateHealth(health: Health) {
  const [name, setTitle] = useState(health.name);
  const [address, setPrice] = useState(health.address);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:8080/health/health/${health.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {health.name}</h3>
          <form onSubmit={handleUpdate}>
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
                onChange={(e) => setPrice(String(e.target.value))}
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
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react'
import "../styles/Recent.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const RecentlyAdded = ({ contacts, setContacts }) => {
  const [sortBy, setSortBy] = useState("recent");
  const sortedContacts = [...contacts].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "email") {
      return a.email.localeCompare(b.email);
    }
    return 0;
  })
  const handleDelete = async (id) => {
    try {
      // Optimistic update
      setContacts(prev =>
        prev.filter(contact => contact._id !== id)
      );

      await axios.delete(`https://contact-form-mern-y40y.onrender.com/${id}`);

      toast.success("Contact deleted");
    } catch (err) {
      toast.error("Failed to delete contact");
    }
  }
  return (
    <div className="tableWrapper">
      {contacts.length == 0 ? "No Contacts Added" : <>
        <div className='header'>
          <h3>Contacts Sorted By {sortBy}</h3>
          <div className="sortButtons">
            <button className="sortbtns" onClick={() => setSortBy("recent")}>Recent</button>
            <button className="sortbtns" onClick={() => setSortBy("name")}>Name</button>
            <button className="sortbtns" onClick={() => setSortBy("email")}>Email</button>
          </div>
        </div>
        <div className="tableScroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedContacts.map((c, index) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td className="message">{c.message != "" ? c.message : "No Message"}</td>
                  <td>
                    {new Date(c.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </td>
                  <td><button onClick={() => handleDelete(c._id)} className='deleteBtn'>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>}
      {/* <button>See more</button> */}
    </div>
  )
}

export default RecentlyAdded

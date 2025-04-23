import React from "react";
import styles from "../../styles/RecentUsers.module.css";
import { Mail, UserRound, ShieldCheck } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Marvy Wilson",
    email: "marvy@company.com",
    role: "Admin",
    joined: "Apr 14, 2025",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@company.com",
    role: "User",
    joined: "Apr 12, 2025",
  },
  {
    id: 3,
    name: "Samuel Bright",
    email: "sam@company.com",
    role: "User",
    joined: "Apr 10, 2025",
  },
];

export default function RecentUsers() {
  return (
    <div className={styles.tableBox}>
      <h3 className={styles.title}>
        <UserRound size={18} className={styles.icon} /> Recent Users
      </h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <UserRound size={16} className={styles.cellIcon} /> {user.name}
              </td>
              <td>
                <Mail size={16} className={styles.cellIcon} /> {user.email}
              </td>
              <td>
                <ShieldCheck size={16} className={styles.cellIcon} />{" "}
                {user.role}
              </td>
              <td>{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

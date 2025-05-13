import React from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

export default function Navbar() {
  return (
    <div>
      <div className={styles.header}>
        <p>
          <Link href="/login">
            <FaUser className={styles.icon} />
          </Link>
        </p>
      </div>
    </div>
  );
}

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
            <FaUser className={styles.icon}/>
          </Link>
        </p>
        <span>
          Next.js is a powerful and flexible React framework for building modern
          web applications. It is built on top of Node.js, a JavaScript runtime
          that allows developers to run JavaScript code on the server side.
          Next.js combines the best features of React, a popular JavaScript
          library for building user interfaces, with server-side rendering,
          static site generation, and other advanced features.
        </span>
      </div>
    </div>
  );
}

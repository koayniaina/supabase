// import Navbar from "@/components/Navbar";
import User from "@/components/User";
import styles from "@/styles/Header.module.css";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={styles.layoutpage}>
        <User />
        {children}
      </div>
    </div>
  );
}

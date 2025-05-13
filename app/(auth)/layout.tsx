import styles from '@/styles/Auth.module.css'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.auth}>
        {children}
    </div>
  
  );
}

import styles from '@/styles/Auth.module.css'
export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>
      <div className={styles.confirm}>
        <p className={styles.confirm_text}>{searchParams.message}</p>
      </div>
    </>
  );
}

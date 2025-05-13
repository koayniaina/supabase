import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import styles from "@/styles/Auth.module.css";
import { redirect } from "next/navigation";

import { MdLockOutline, MdOutlineEmail } from "react-icons/md";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  return (
    <>
      <div className={styles.login}>
        <form action={signIn}>
          <p className={styles.text}>Sign In</p>
          <div className={styles.input}>
            <MdOutlineEmail className={styles.icon} />
            <input name="email" placeholder="me@example.com" required />
          </div>

          <div className={styles.input}>
            <MdLockOutline className={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="password..."
              required
            />
          </div>
          <p className={styles.password}>
            <span><input type="checkbox"/> I Accept to the terms</span>
            <Link href="/forgot-password" >
              Forgot Password?
            </Link>
          </p>

          <button className={styles.button}>Login</button>

          {searchParams?.message && <p>{searchParams.message}</p>}

          <p className={styles.register}>
            I don't have account ?
            <Link href="/register" className={styles.link}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

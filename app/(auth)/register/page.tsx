import styles from "@/styles/Auth.module.css";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect('/');
  }

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = (await headers()).get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return redirect('/signup?message=Passwords do not match');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/signup?message=Could not authenticate user');
    }

    return redirect(
      '/login'
    );
  };

  return (
    <div>
      <div className={styles.login}>
        <p className={styles.text}>Sign Up</p>
        <form action={signUp}>
          <div className={styles.input}>
            <MdOutlineEmail />
            <input name="email" placeholder="me@example.com" required />
          </div>

          <div className={styles.input}>
            <MdLockOutline />
            <input
              type="password"
              name="password"
              placeholder="passowrd"
              required
            />
          </div>
          <div className={styles.input}>
          <MdLockOutline />
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirmpassword"
              required
            />
          </div>
          <button className={styles.btns}>Register</button>

          {searchParams?.message && <p>{searchParams.message}</p>}
        </form>
          <p className={styles.register}>
            Already have an account?  <Link
            href="/login">Login
          </Link>
          </p>
      </div>
    </div>
  );
}

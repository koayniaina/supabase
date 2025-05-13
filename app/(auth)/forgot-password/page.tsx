import Link from "next/link";
import { headers } from "next/headers";
import styles from "@/styles/Auth.module.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ForgotPassword({
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

  const confirmReset = async (formData: FormData) => {
    "use server";

    const origin = (await headers()).get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/reset-password`,
    });

    if (error) {
      return redirect("/forgot-password?message=Could not authenticate user");
    }

    return redirect(
      "/confirm?message=Password Reset link has been sent to your email address"
    );
  };

  return (
    <>
      <div className={styles.login}>
        <form action={confirmReset}>
          <div className={styles.inputs}>
            <input name="email" placeholder="me@example.com" required />
          </div>

          <button className={styles.buts}>Confirm</button>

          {searchParams?.message && <p>{searchParams.message}</p>}
          <p>
            I remember my password? <Link href="/login" className={styles.link}>Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

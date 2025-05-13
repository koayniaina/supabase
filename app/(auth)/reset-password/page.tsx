import { createClient } from "@/utils/supabase/server";
import styles from "@/styles/Auth.module.css";
import { redirect } from "next/navigation";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  const resetPassword = async (formData: FormData) => {
    "use server";

    const password = formData.get("password") as string;
    const supabase = createClient();

    if (searchParams.code) {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      );

      if (error) {
        return redirect(
          `/reset-password?message=Unable to reset Password. Link expired!`
        );
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(
        `/reset-password?message=Unable to reset Password. Try again!`
      );
    }

    redirect(
      `/login?message=Your Password has been reset successfully. Sign in.`
    );
  };

  return (
    <div>
      <div className={styles.login}>
        <form action={resetPassword}>
          <p className={styles.text}>Rest Password</p>
         <div className={styles.input}>
            <input
              type="password"
              name="password"
              placeholder="password"
              required
            />
         </div>
          <div className={styles.input}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirmpassword"
              required
            />
          </div>
          <button className={styles.reset}>Reset</button>

          {searchParams?.message && <p>{searchParams.message}</p>}
        </form>
      </div>
    </div>
  );
}

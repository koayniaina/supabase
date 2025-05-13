import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function User() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return (
    session && (
      <div>
        Hey, {session.user.email}!
        <form action={signOut} className='flex flex-col-2'>
          <button>
            Logout
          </button>
        </form>
      </div>
    )
  );
}

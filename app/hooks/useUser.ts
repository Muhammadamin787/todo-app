import { IUser } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function useUser() {

     // States
     const [user, setUser] = useState<IUser>();
     const [loading, setLoading] = useState(true);
     const router = useRouter()

     // Effects
     useEffect(() => {
          const getUser = async () => {
               try {
                    // setUser(await account.get())
                    setLoading(false)
               } catch (error) {
                    setLoading(false)
                    console.error(error)
               }
          }
          getUser()
     }, [])

     return { user, loading }
}

export default useUser
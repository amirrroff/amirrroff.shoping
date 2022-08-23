import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Store } from '../utils/store';

export default function Shiping() {
    const router = useRouter()
    router.push("/login")
    const { state } = useContext(Store);
    const { userInfo } = state;
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
  }
  return (
    <div>
      shipping
    </div>
  )
}

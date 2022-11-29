import React from 'react'
import { TwinSpin } from 'react-cssfx-loading'

const ShadowLoading = () => {
    return (
        <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-[rgba(0,0,0,0.06)]">
            <TwinSpin color="#f53d2d" width={50} height={50} />
        </div>
    )
}

export default ShadowLoading
import React from 'react'

type ModalRefundProps = {
    open: boolean,
    handleHide: () => void
}

const ModalRefund: React.FC<ModalRefundProps> = ({ open, handleHide }) => {
    return (
        <div className={`${open ? "flex" : "hidden"}`}>
            <div
                className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.6)]"
                onClick={() => {
                    handleHide();
                }}
            ></div>
        </div>
    )
}

export default ModalRefund
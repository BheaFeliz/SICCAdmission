import { Button, Modal } from 'flowbite-react'
import React, { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const DeleteModal = ({ handleDelete }) => {
  const [showModal, setShowModal] = useState(false)

  const confirmDelete = () => {
    handleDelete()
    setShowModal(false)
  }

  return (
    <>
      <Button size='xs' color='failure' onClick={() => setShowModal(true)}>
        Delete
      </Button>
      <PopUpModal
        showModal={showModal}
        setShowModal={setShowModal}
        confirmDelete={confirmDelete}
      />
    </>
  )
}

const PopUpModal = ({ showModal, setShowModal, confirmDelete }) => {
  return (
    <Modal show={showModal} size='md' onClose={() => setShowModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
            Are you sure you want to delete this order?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={confirmDelete}>
              {"Yes, I'm sure"}
            </Button>
            <Button color='gray' onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteModal
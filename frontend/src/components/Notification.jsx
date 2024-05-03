const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="errorMessageLogin">
      {message}
    </div>
  )
}

export default Notification;